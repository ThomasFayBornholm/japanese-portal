var DEBUG=false;

sentences = {
"にほんはにせんよんじゅういちねんにしんじゅわんをこうげきしました。": "Nihon wa 1941 nen ni Shinjuwan o kōgeki shimashita → Japan attacked Pearl Harbor in 1941.",
"たいせいよくぐんはにせんよんじゅうごねんににほんをはいぼくさせました。": "Taiseiyokugun wa 1945 nen ni Nihon o haiboku saremashita → The Allied Powers defeated Japan in 1945.",
"アメリカはひろしまにげんしばくだんをとうかしました。": "Amerika wa Hiroshima ni genshi bakudan o tōka shimashita → The United States dropped an atomic bomb on Hiroshima.",
"そのあとで、ながさきでもうひとつのばくだんがおとされました。" : "Sono ato de, Nagasaki de mō hitotsu no bakudan ga otosaremashita → Another bomb was dropped on Nagasaki afterwards.",
"にほんのこくみんはせんそうのためにおおくのくろうをけいけんしました。": "Nihon no kokumin wa sensō no tame ni ōku no kurō o keiken shimashita → The Japanese people experienced a lot of hardship because of the war.",
"ドイツはにせんよんじゅうごねんのはるにこうふくしました。": "Doitsu wa 1945 nen no haru ni kōfuku shimashita → Germany surrendered in the spring of 1945.",
"せんそうちゅうにたくさんのひとびとがこくぐんでたたかいました。": "Sensōchū ni takusan no hitobito ga kokugun de tatakaimashita → Many people fought in the national army during the war.",
"ひゃくまんいじょうのへいしがヨーロッパのたたかいでしにました。": "Hyakuman ijō no heishi ga Yōroppa no tatakai de shinimashita → More than one million soldiers died in the battles in Europe.",
"にほんせいふはにせんよんじゅうごねんはちがつにこうふくぶんしょにしゅういんしました。": "Nihon seifu wa 1945 nen hachigatsu ni kōfuku bunsho ni shūin shimashita → The Japanese government signed the surrender document in August 1945.",
"せんそうがおわったあとで、せかいはへいわのたいせつさをまなびました。": "Sensō ga owatta ato de, sekai wa heiwa no taisetsu-sa o manabimashita → After the war ended, the world learned the importance of peace."
    };

var GLOBAL = {

}

function startup() {
    $('#iInput').focus();
    word_count();
   random_sentence();
   hiragana_chart();
}

function random_integer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random_sentence() {
    let len = Object.keys(sentences).length;
    let idx = random_integer(0,len);
    console.log()
    let key = Object.keys(sentences)[idx];
    let res = key + "<br>" + sentences[key];
    $('#iContent').html(res);
}

async function new_input(ev) {
    if (ev.key === "Escape") {
        $('#iInput').val("");
        return;
    } else if (ev.key === "Enter") {
        let inp = $('#iInput').val()
        seek_word(inp);
        return;
    }
    let input = $('#iInput').val()
    const res = await fetch('backend/getSuggestions.php?text=' + input,{
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let json = await res.json();
    let tmp = json["matches"];
    let out_html = "<table>";
    for(const t of tmp) {
        out_html += "<tr><td>" + t[1] + "</td><td>-</td><td>" + t[0] + "</td></tr>";
    }
    out_html += "</table>";
    $('#iSuggestions').html(out_html);
}

async function seek_word(word) {
    if (word === "") {
        random_sentence();
        return; 
    }
    const res = await fetch('backend/getDef.php?word=' + word, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let json = await res.json();
    if (json["def"].length > 0) {
        let root = "";
        if (json["root"].length ===  0) {
            root = word
        } else {
            root = json["root"]; 
        }
        let out_html = root  + " -> " + json["def"] + " [" + json["class"] + "] ";
        let out_conj = "";
        $('#iInput').attr("placeholder"," " + json["hiragana"]);
        if (json["conj"].length > 0) {
            let conj = json["conj"].join(" - ");
            conj = conj.replace(word,"<b>" + word + "</b>");
            out_conj += "<br>" +  conj;
        }
        if (json["conj-hiragana"].length > 0)  {
            out_conj+= "<br>" + json["conj-hiragana"].join(" - ");
        }
        $('#iFeedback').html(out_html);
        //$('#iConj').html(out_conj);
        $('#iInput').val("");
        $('#iSuggestions').empty();
        let sentence = $('#iContent').text();
        let hg = json["hiragana"];
        sentence = sentence.replace(hg,"<span style='color: red'> "+ hg + "</span>" );
        sentence = sentence.replace("。","。<br>");
        $('#iContent').html(sentence);
    }
}

async function word_count() {
    const res = await fetch('backend/wordCount.php', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let json = await res.json();
    $('#iInput').attr("placeholder",json["count"] + " searchable words");
}

async function get_conj(word) {
    const res = await fetch('backend/getConj.php?word=' + word, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let json = await res.json();
    if ("root" in json) {
        if (json["root"].length > 1) {
            seek_word(json["root"]);
        }
    }
}

async function hiragana_chart() {
    const res = await fetch('backend/getHiragana.php', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let json = await res.json();
    let out_html = "<table>"
    let keys = Object.keys(json);
    out_html += "<tr><td><span class='romanji'>a  : </span>" + json["a"] + "</td><td><span class='romanji'>; i :</span>" + json["i"] +  "<td><span class='romanji'>u :</span> " + json["u"]  + "<span class='romanji'>; e : </span>" + json["e"] + "<span class='romanji'> ; o : </span>" + json["o"] + "<td></tr>";
    out_html += "<tr><td><span class='romanji'>ka  : </span>" + json["ka"] + "</td><td><span class='romanji'>; ki :</span>" + json["ki"] +  "<td><span class='romanji'>ku :</span> " + json["ku"]  + "<span class='romanji'>; ke : </span>" + json["ke"] + "<span class='romanji'> ; ko : </span>" + json["ko"] + "<td></tr>";
    out_html += "<tr><td><span class='romanji'>sa  : </span>" + json["sa"] + "</td><td><span class='romanji'>;  shi :</span>" + json["shi"] +  "<td><span class='romanji'>su :</span> " + json["su"]  + "<span class='romanji'>; se : </span>" + json["se"] + "<span class='romanji'> ; so : </span>" + json["so"] + "<td></tr>";
    out_html += "<tr><td><span class='romanji'>ta  : </span>" + json["ta"] + "</td><td><span class='romanji'>;  chi :</span>" + json["chi"] +  "<td><span class='romanji'>tsu :</span> " + json["tsu"]  + "<span class='romanji'>; te : </span>" + json["te"] + "<span class='romanji'> ; to : </span>" + json["to"] + "<td></tr>";
    $('#iHiragana').html(out_html);
}