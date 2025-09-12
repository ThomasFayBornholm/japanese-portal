var DEBUG=false;

var GLOBAL = {

}

function startup() {
    $('#iInput').focus();
}

async function new_input(ev) {
    if (ev.key === "Escape") {
        $('#iInput').val("");
        return;
    } else if (ev.key === "Enter") {
        let inp = $('#iInput').val()
        seekWord(inp);
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
    let out_html = "";
    for(const t of tmp) {
        out_html += "<br>" + t[0] + " - " + t[1];
    }
    $('#iFeedback').html(out_html);
}

async function seekWord(word) {
    const res = await fetch('backend/getDef.php?word=' + word, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let json = await res.json();
    if (json["def"].length > 0) {
        let out_html = json["hiragana"] + "<br>" + word + " -> " + json["def"];
        $('#iFeedback').html(out_html);
        $('#iInput').val("");
    }

}