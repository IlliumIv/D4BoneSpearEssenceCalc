function setValue(from, to) {
    document.getElementById(to).value = document.getElementById(from).value;
    calc();
}

function check(id) {
    var b_value = !document.getElementById(id + "_check").checked;
    document.getElementById(id).disabled = b_value;
    document.getElementById(id + "_value").disabled = b_value;
    if (!b_value) {
        document.getElementById(id + "_desc").classList.remove("line-through");
    } else {
        document.getElementById(id + "_desc").classList.add("line-through");
    }
    calc();
}

function calc() {
    var res = document.getElementById("result");
    var etc = document.getElementById("etc");
    var con = document.getElementById("conclusion");
    con.classList.remove("red", "green");
    var Paspect = document.getElementById("Paspect").value / 100;
    var Pstat = document.getElementById("Pstat").value / 100;
    var Cm = 1 + (document.getElementById("Cm").value / 100);
    var Ecr = 1 - (document.getElementById("Ecr").value / 100);
    var Hcost = document.getElementById("Hcost").value * Ecr * Cm;
    var Hpc = document.getElementById("Hpc").value;
    var Plh = document.getElementById("Plh").value;
    var Rg = document.getElementById("Rg").value / 100 + 1;
    var Gaspect = document.getElementById("Gaspect").value / 100;
    var Ggloves = document.getElementById("Ggloves").value / 100;
    var Goffhand = document.getElementById("Goffhand").value / 100;
    var Emax = document.getElementById("Emax").value;
    var Gapc = Hpc * Plh * Paspect * Gaspect * Rg;
    var Ggpc = Hpc * Plh * Emax * Pstat * Ggloves / 100 * Rg;
    var Gopc = Hpc * Plh * Emax * Pstat * Goffhand / 100 * Rg;
    var G = 0;
    if (document.getElementById("Gaspect_check").checked) {
        G = G + Gapc;
    }
    if (document.getElementById("Ggloves_check").checked) {
        G = G + Ggpc;
    }
    if (document.getElementById("Goffhand_check").checked) {
        G = G + Gopc;
    }
    var compare;
    if (G > Hcost) {
        compare = "<";
        con.classList.add("green");
        etc.innerHTML = "On average resource be restored";
    } else {
        compare = ">";
        con.classList.add("red");
        etc.innerHTML = "On average resource not be restored";
    }
    res.innerHTML = Hcost.toFixed(2).toString() + " " + compare + " " + G.toFixed(2).toString();
}

calc();