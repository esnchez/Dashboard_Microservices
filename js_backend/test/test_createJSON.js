const result = [
    {
        name: 'news',
        uri: 'https://newsapi.org/v2/everything?q=',
        apiKey: '14156fac04bb4bfdb1e936ea871caee6',
        param_name: 'test',
        param_value: 'test_value'
    },
    {
        name: 'news',
        uri: 'https://newsapi.org/v2/everything?q=',
        apiKey: '14156fac04bb4bfdb1e936ea871caee6',
        param_name: 'about',
        param_value: 'tesla'
    },
    {
        name: 'test',
        uri: 'http://blablabbaaaa',
        apiKey: 'ionaóiNAÍJ30J239EIÇº¡2',
        param_name: 'key2',
        param_value: 'value2'
    },
    {
        name: 'test',
        uri: 'http://blablabbaaaa',
        apiKey: 'ionaóiNAÍJ30J239EIÇº¡2',
        param_name: 'key1',
        param_value: 'value1'
    }
]



function parseToJson(data) {
    let json = {
        widgets: []
    };
    for (let i = 0; i < data.length; i++) {
        data[i]["params"] = [];
        let obj = { [data[i].param_name]: data[i].param_value };

        for (tr = 0, j = i + 1; j < data.length; j++) {
            if (data[i].name === data[j].name) {

                obj[data[j].param_name] = data[j].param_value;
                data.splice(j, 1);
                j--;
                tr++;
            }
        }
        data[i]["params"] = obj;
        json.widgets = data;

    }
    // console.log("JSON->", json)
    const widgets = json.widgets;
    for (let i = 0; i < widgets.length; i++) {
        delete widgets[i].param_name;
        delete widgets[i].param_value;
    }

    console.log("DEFINITIVE JSON->", widgets)

}

parseToJson(result);