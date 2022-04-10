# char-update

Run update on ur characters on check-pvp.fr

To run script npm start from char-update folder

JSON output in frontend/data.

Use nginx or express to serve data to http endpoint.

Telegraf data with JSON, queries in GJSON.

Telegraf data to influxDB2 Cloud (Can be hosted on AWS, Google Cloud or Azure)

# Configs:

# Telegraf.conf example:

[[inputs.http]]
urls = [
"http://192.168.8.109/data.json"
]
data_format = "json_v2"
tagexclude = ["url", "host", "lastupdate"]
[[inputs.http.json_v2]]

        measurement_name = "rating"
        [[inputs.http.json_v2.object]]
            path = "@this"
            tags = ["player"]
            disable_prepend_keys = false

# Crontab example:

I.e. https://crontab.guru/ can be used to set correct schedule

#AT EVERY HOURE
1 \* \* \* \* cd /home/pi/char-update/app/ && /usr/local/bin/node app.js 2>&1 >> /home/pi/logs/char-update.log

# Flux query for win percentage

from(bucket: "telegraf")
|> range(start: v.timeRangeStart, stop: v.timeRangeStop)
|> filter(fn: (r) => r["_measurement"] == "test8")
|> filter(fn: (r) => r["_field"] == "loss2v2" or r["_field"] == "wins2v2")
|> filter(fn: (r) => r["player"] == "Toremann")
|> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "\_value")
|> map(fn: (r) => ({r with \_value: r.wins2v2 / (r.loss2v2 + r.wins2v2) \* 100.0}))
