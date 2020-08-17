local cjson = require "cjson"

ngx.req.read_body()

local res = ngx.location.capture(
            '/api/staff/delete',
            {method = ngx.HTTP_DELETE, 
            body = ngx.req.get_body_data()}
        )
        
ngx.say(res.body)

if (res.status < 400) then 
    local data = cjson.decode(res.body)
    for index, obj in ipairs(data) do
        local file_name = string.match(data[index]["selfie"], "/([^/]*)$")
        local file_path = ngx.var.store_path .. file_name
        local f = io.open(file_path,"r")
        if f then 
            io.close(f) 
            os.remove(file_path)
        end        
    end
end
