const supabase = require("../data/supabase.js");

function listarchamado() {
    return supabase.from("chamados").select("*");
}

function buscarChamado(id) {
    return supabase.from('chamados').select('*').eq('id', id);
}

function cadastrarchamado(chamado) {
    return supabase.from("chamados").insert([chamado]).select();
}

function atualizarchamado(id, chamado) {
    return supabase.from("chamados").update(chamado).eq("id", id).select();
}

function deletarchamado(id) {
    return supabase.from("chamados").delete().eq("id", id);
}

module.exports = {
    listarchamado,
    buscarChamado,
    cadastrarchamado,
    atualizarchamado,
    deletarchamado
};