const myHeaders = new Headers();

const myCookie = "" // 在这里填入你的cookie
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", myCookie);



async function del(ids) {
    const raw = JSON.stringify({
        "conversationIds": ids,
        "uiOptions": {
            "noToast": true
        }
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };



    fetch("https://yuanbao.tencent.com/api/user/agent/conversation/v1/clear", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

async function main() {
    if (!myCookie) {
        console.log("请先设置cookie")
        return;
    }
    const raw = JSON.stringify({
        "agentId": "naQivTmsDa",
        "offset": 0,
        "limit": 50, // 最多50
        "filterGoodQuestion": true
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    while (true) {
        const data = await fetch("https://yuanbao.tencent.com/api/user/agent/conversation/list", requestOptions)
            .then((response) => response.json())
            .catch((error) => console.error(error));

        if (data.conversations.length === 0) {
            console.log("没有需要删除的会话");
            return;
        }
        const ids = data.conversations.map((item) => item.id);
        del(ids);
    }

}
main()