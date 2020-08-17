local upload = require "resty.upload"
local cjson = require "cjson"
local function my_get_file_name(header)
    local file_name
    for i, ele in ipairs(header) do
        file_name = string.match(ele, 'filename="(.*)"')
        if file_name and file_name == '' then
            return ''
        elseif file_name and file_name ~= '' then
            --return file_name
            return os.time()
        end
    end
    return nil
end

local function my_get_key(header)
    local key
    for i, ele in ipairs(header) do
        if string.match(ele, 'filename') then
            key = string.match(ele, 'name="(.*)";')
        else
            key = string.match(ele, 'name="(.*)"')
        end
        if key and key ~= '' then
            return key
        end
    end
    return nil
end

local chunk_size = 4096
local form, err = upload:new(chunk_size)
if not form then
    ngx.log(ngx.ERR, "failed to new upload: ", err)
    ngx.exit(500)
end
local file
local file_name
local file_path
local req_body = {}
local current_key
local empytFile = false
local curFileEmpty = false;
local staffId
while true do
    local typ, res, err = form:read()
    if not typ then
        ngx.say("failed to read: ", err)
        return
    end

    if typ == "header" then 
        local a_file_name = my_get_file_name(res)        
        if a_file_name and a_file_name ~= '' then
            file_name = a_file_name
            file_path = ngx.var.store_path..a_file_name
            file = io.open(file_path, "w+")
            if not file then
                ngx.say("failed to open file", file_path)
                return
            end
        elseif a_file_name and a_file_name == '' then            
            empytFile = true;
            curFileEmpty = true;
        end

        local key = my_get_key(res)
        if key then
            current_key = key
        end

    elseif typ == "body" then
        if file then
            file:write(res)
        elseif current_key then
            if res == "true" then
                req_body[current_key] = true
            elseif res == "false" then            
                req_body[current_key] = false
            elseif curFileEmpty then
                req_body[current_key] = ''
                curFileEmpty = false
            elseif res == "" then
                req_body[current_key] = nil
            else
                req_body[current_key] = res
            end
            if current_key == 'id' then
                staffId = res
            end
        end

    elseif typ == "part_end" then
        if file then
            file:close()
            file = nil
            if file_name then
                req_body.selfie = "/assets/staff/" .. file_name
            end
        else
            current_key = nil
        end

    elseif typ == "eof" then
        local data = cjson.encode(req_body)
        ngx.req.set_header("Content-Type","application/json")
        local res = ngx.location.capture(
            '/api/staff/' .. staffId .. '/update',
            {method=ngx.HTTP_POST, body = data}
        )
        if (not empytFile) and (res.status >= 400) then
            os.remove(file_path)
        elseif not empytFile then
            local res_data = cjson.decode(res.body)
            local prevFile = string.sub(res_data.selfie, 15)
            if file_name and file_name ~= prevFile then            
                file_path = ngx.var.store_path .. prevFile
                os.remove(file_path)   
            end              
        end
        if res.status >= 400 then
            ngx.say(res.body)
        else
            ngx.req.set_header("Content-Type","application/json")
            local res_updated = ngx.location.capture(
                '/api/staff/' .. staffId,
                {method=ngx.HTTP_GET}
            )
            ngx.say(res_updated.body)    
        end
        break
    end
end