console.log("[I]: DLYou start.")

var href = "";

function mkURL(vid) {
    var host = "https://www.online-downloader.com/DL/dd.php?";
    var preURL = "jsoncallback7742=jQuery111305880278742000606_1495459497944&"
        + "videourl=https://www.onlineonlineonline.com/watch?v=";
    var lastURL = "&mstr=7742&_=1495459497985";
    if(vid === null) {
        return null;
    }
    return host + preURL + vid + lastURL;
}

function extractYoutubeURL(origin_url) {
    var re = /https:\/\/www\.youtube\.com\/watch\?v=(.*?)/g;
    var myArray = origin_url.match(re);
    if(myArray === null) {
        console.log("[E]: youtube url not right.");
        return null;
    }
    return origin_url.substring(32, 44);
}

function extractText(data) {
    var re = /{(.*?)}/g;
    var myArray = data.match(re);
    if(myArray !== null) {
        return myArray[0];
    }
    return null;
}

function retDownloadURL(jsonFile) {
    if(jsonFile === null) {
        console.log("[E]: json file not right.");
        return null;
    }
    console.log("Video_Title: " + jsonFile["Video_Title"]);
    for(var index = 1; index < 20; ++index) {
        var ext = "Video_" + index + "_Ext";
        var url = "Video_" + index + "_Url";
        if(jsonFile[ext] === "mp4") {
            console.log("Video_DownloadURL: " + jsonFile[url]);
            return url;
        }
    }
    return null;
}

function addDLButton(title, downloadURL) {
    ele = document.createElement("div");
    ele.setAttribute("class", "yt-uix-menu");
    a = document.createElement("a");
    a.setAttribute("href", downloadURL + "&title=" + encodeURI(title));
    a.setAttribute("download", title + ".mp4");
    a.setAttribute("class",
        "yt-uix-button yt-uix-button-size-default yt-uix-button-opacity "
        + "yt-uix-button-has-icon no-icon-markup "
        + "pause-resume-autoplay yt-uix-menu-trigger yt-uix-tooltip");
    a.innerHTML = "下载";
    ele.appendChild(a);
    pare = document.getElementById("watch8-secondary-actions");
    pare.appendChild(ele);
}

function main(origin_url) {
    var jsonFile;
    var url = mkURL(extractYoutubeURL(origin_url));
    var xhr = new XMLHttpRequest();
    console.log("[I]: url is ", origin_url);
    if(url !== null) {
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                console.log("[I]: XML request ready.");
                if(xhr.status == 200) {
                    console.log("[I]: Get URL OK.");
                    //console.log(xhr.responseText);
                    jsonFile = JSON.parse(extractText(xhr.responseText));
                    addDLButton(jsonFile["Video_Title"], jsonFile[retDownloadURL(jsonFile)]);
                }
            }
            else {
                console.log("[W]: XML request not ready.");
            }
        };
        xhr.send();
    }
}

var callback = function() {
    if(href != location.href) {
        main(location.href);
        href = location.href;
    }
}

setInterval(callback, 1000)
