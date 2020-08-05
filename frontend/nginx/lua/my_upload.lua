local upload = require "resty.upload"
local cjson = require "cjson"
local function my_get_file_name(header)
    local file_name
    for i, ele in ipairs(header) do
        file_name = string.match(ele, 'filename="(.*)"')
        if file_name and file_name ~= '' then
            return file_name
        end
    end
    return nil
end

local function my_get_key(header)
    local key
    for i, ele in ipairs(header) do
        key = string.match(ele, 'name="(.*)"')
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
while true do
    local typ, res, err = form:read()
    if not typ then
        ngx.say("failed to read: ", err)
        return
    end

    if typ == "header" then 
        local a_file_name = my_get_file_name(res)
        if a_file_name then
            file_name = a_file_name
            file_path = ngx.var.store_path..a_file_name
            file = io.open(file_path, "w+")
            if not file then
                ngx.say("failed to open file", file_path)
                return
            end
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
            elseif res == "" then
                req_body[current_key] = nil
            else
                req_body[current_key] = res
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
            '/api/staff/add',
            {method=ngx.HTTP_POST, body = data}
        )
        if (res.status >= 400) then
            os.remove(file_path)
            -- ngx.say("Saving Data error, file uploaded has been deleted")
        end
        ngx.say(res.body)
        break
    end
end