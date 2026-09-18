const supabase = require("../data/supabase.js");

function listarchamado() {
    return supabase.from("chamados").select("*");
    let query = supabase.from("chamados").select("*");
}

function cadastrarchamado(chamado) {
    return supabase.from("chamados").insert([chamado]);
}

function atualizarchamado(id, chamado) {
    return supabase.from("chamados").update(chamado).eq("id", id);
}

function deletarchamado(id) {
    return supabase.from("chamados").delete().eq("id", id);
}

module.exports = {
    listarchamado,
    cadastrarchamado,
    atualizarchamado,
    deletarchamado
};