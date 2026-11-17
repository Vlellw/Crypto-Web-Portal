// SECTION 0: Displaying the quote

async function daily_quote_call() {
    let a1 = document.querySelector("header h1");
    let q = await daily_quote();
    a1.innerHTML = q;
}

if (typeof daily_quote === 'function') {daily_quote_call()}



// SECTION 1: Displaying the charts

function crypto_info(s1, s2) {
    document.getElementById("info_about_point").innerHTML = "Date: " + s1 + " | Price: $" + s2;
}
function crypto_info_helper(e, w1, w2){
    let dot = e.target.closest("circle");
        if (dot) {
            let dots = Array.from(e.currentTarget.querySelectorAll("circle"));
            let index = dots.indexOf(dot);
            
            if (index !== -1) {
                crypto_info(w1[index], w2[index]);
            }
        }
}

function display_api_merge_info(pr, avg, diff) {
    let m = document.getElementById("additional_text");
    if (m !== null) {
        m.innerHTML = "Live price: <strong>$" + pr.toFixed(2) + 
            "</strong> | Period Avg: <strong>$" + avg.toFixed(2) + 
            "</strong> | Diff: <strong>" + diff.toFixed(2) + "%</strong>";
    }
}

async function chart1_update(days) {
    let c = document.getElementById("select_cur").value;
    
    let res = await crypto_data(c, days);
    let a = res.coingecko;
    let b = res.paprika;

    let pr = a.prices;
    let cap = a.market_caps;
    let w1 = [];
    let w2 = [];
    let w3 = [];
    let count = 0;

    for (let i = 0; i < pr.length; i ++){
        let d = new Date(pr[i][0]);
        w1.push(d.toLocaleDateString());
        w2.push(pr[i][1]);
        count += pr[i][1];
        if (cap && cap[i]) {
            w3.push(cap[i][1]);
        }
    }
    
    let avgG = count / pr.length;
    let diff = ((b - avgG) / avgG) * 100;

    display_api_merge_info(b, avgG, diff);
    

    document.getElementById("charts").innerHTML = "";

    ch1 = new frappe.Chart("#charts", {
        data: {
            labels: w1,
            datasets: [
                {
                    values: w2
                }
            ]
        },
        type: "line",
        height: 300,
        colors: [document.getElementById("chart_color").value],
        lineOptions: { hideDots: 0, dotSize: 6, regionFill: 1 }
    });

    let chartsContainer = document.getElementById("charts");
    chartsContainer.addEventListener("click", function(e) {
        crypto_info_helper(e, w1, w2);
    });

    let chart2 = document.getElementById("charts2");
    if (chart2 && chart2.style.display !== "none") {
        chart2_update(days);
    }
}


async function chart2_update(days){
    let c = document.getElementById("select_cur").value;
    
    let res = await crypto_data(c, days);
    let a = res.coingecko;

    let pr = a.prices;
    let cap = a.market_caps;
    let w1 = [];
    let w2 = [];
    let w3 = [];
    let count = 0;

    for (let i = 0; i < pr.length; i ++){
        let d = new Date(pr[i][0]);
        w1.push(d.toLocaleDateString());
        w2.push(pr[i][1]);
        count += pr[i][1];
        if (cap && cap[i]) {w3.push(cap[i][1] / 1000000000)}
    }
    if (document.getElementById("charts2").style.display !== "none") {
        document.getElementById("charts2").innerHTML = "";
        ch2 = new frappe.Chart("#charts2", {
            data: {
                labels: w1,
                datasets: [{ values: w3 }]
            },
            type: "line",
            height: 300,
            colors: [document.getElementById("chart_color").value],
            lineOptions: { hideDots: 0, dotSize: 6, regionFill: 1 }
        });
        let l = document.getElementById("charts2_label");
        if (l) {l.style.display = "block"}
    }
} 



let search_btn = document.getElementById("search_btn");
if (search_btn) {
    search_btn.addEventListener("click", search_period);
}
async function search_period() {
    await chart1_update(document.getElementById("period").value);
}

let add_cap_btn = document.getElementById("add_chart_btn");
if (add_cap_btn) {
    add_cap_btn.addEventListener("click", new_chart);
}
async function new_chart() {
    document.getElementById("charts2").style.display = "block";
    setTimeout(async function() {
        await chart2_update(document.getElementById("period").value);
    }, 50);
}

if (document.getElementById("select_cur")) {chart1_update(30)}



// SECTION 2: Implemeting exchange crypto logic

function diplay_exchange_crypto(live_total, diff, recomend) {
    let resultBlock = document.getElementById("ex_result");
    if (resultBlock) {
        resultBlock.innerHTML = "Current Portfolio Value: " + live_total.toFixed(2)+ "$" + 
            " | Price Change: " + diff.toFixed(2) + "%" +
            "<br>Observation: " + recomend;
    }
}

function exchange_crypto_helper(pr, d) {
    let time = new Date(d).getTime();
    let closest_pr = pr[0][1];
    let min_diff = Math.abs(pr[0][0] - time);

    for (let i = 0; i < pr.length; i++) {
        let diff = Math.abs(pr[i][0] - time);
        if (diff < min_diff) {
            min_diff = diff;
            closest_pr = pr[i][1];
        }
    }
    return closest_pr;
}

async function exchange_crypto() {
    let cur = document.getElementById("ex_cur").value;
    let amount = parseFloat(document.getElementById("ex_amount").value);
    let d = document.getElementById("ex_date").value;

    if (!amount || !d) {
        alert("Please enter both amount and purchase date!");
        return;
    }

    let res = await crypto_data(cur, 365);
    let pr = res.coingecko.prices;
    let live_pr = res.paprika;

    let s = exchange_crypto_helper(pr, d);
    
    let live_total = amount * live_pr;
    let total = amount * s
    let m1 = live_total - total
    let diff = (m1 / total) * 100;

    if (m1> 0) {
        recomend = "You are in profit.";
    } else {recomend = "You are in loss."}

    diplay_exchange_crypto(live_total, diff, recomend);
}

let ex_btn = document.getElementById("ex_btn");
if (ex_btn) {ex_btn.addEventListener("click", exchange_crypto)}



// SECTION 3: Implementing log in system

var Admin = false;

function isAdmin(status) {
    if (status !== undefined) {
        Admin = status;
    }
    return Admin;
}

function check_admin_visibility() {
    let a1 = document.getElementById("portfolio_container");
    let link = document.getElementById("link");
    let out = document.getElementById("logout_btn");

    if (isAdmin()) {
        if (a1) a1.style.display = "block";
        if (link) link.style.display = "none";
        if (out) out.style.display = "inline-block";
    } else {
        if (a1) a1.style.display = "none";
        if (link) link.style.display = "inline-block";
        if (out) out.style.display = "none";
    }
}

let out = document.getElementById("logout_btn");
if (out) {out.addEventListener("click", out_clicked)}

function out_clicked() {
    isAdmin(false);
    alert("Logged out successfully!");
    check_admin_visibility();
}

let urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("admin") === "true") {isAdmin(true)}

check_admin_visibility();



// SECTION 4: Implementing the possibility to download chart as SVG

function download_chart() {
    let s = document.querySelector("#charts svg");

    let d = new XMLSerializer().serializeToString(s);
    let blob = new Blob([d], { type: "image/svg+xml;charset=utf-8" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = "crypto_chart.svg";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

let download= document.getElementById("download_btn");
if (download) {download.addEventListener("click", download_chart)}



// SECTION 5: Implementing interactive unit

let count = 0;
function learning_part() {
    const yes = document.getElementById("yes");
    const no = document.getElementById("no");

    if (yes && no) {
        yes.addEventListener("click", yes_pressed);
        no.addEventListener("click", no_pressed);
    }
};

function yes_pressed(){
    document.getElementById("learning_title").innerText = "Great!";
    document.getElementById("learning_content").innerHTML = "Then hurry up and click the links:"+`
        <ul class="learning_links">
            <li><a href="https://www.youtube.com/watch?v=Zoz9gvhLgpM&t=50s" target="_blank">What is Cryptocurrency and How Does it Work?</a></li>
            <li><a href="https://www.youtube.com/watch?v=LGHsNaIv5os" target="_blank">How To Invest in Crypto as A COMPLETE Beginner</a></li>
        </ul>
    `;
}

function no_pressed(){
    if (!isAdmin()) {return}
    count += 1
    if (count >= 3){
        alert("You are not curious enough to be admin!  (Loging out process...)");
        isAdmin(false);
        check_admin_visibility();
        count = 0
        document.getElementById("learning_title").innerText = "Do You want to learn about crypto?";
    } else{document.getElementById("learning_title").innerText = "Are you sure???"}
}

learning_part();
