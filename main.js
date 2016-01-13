'use strict'

$(document).ready(init);

function init() {
  var currentDate = moment().format('YYYY-MM-DD');
  $('#transDate').attr('min', currentDate);

  $('#newTrans').submit(addTrans);
  $('table').on('click', '.delete button', deleteTrans);
}

function addTrans(e) {
  e.preventDefault();

  var transName = $('#transName').val();
  var transDate = $('#transDate').val();
  var formattedDate = moment(transDate).format('ll');
  var deposit = ($('#transAmount').val() > 0) ? $('#transAmount').val() : null;
  var withdrawal = ($('#transAmount').val() < 0) ? $('#transAmount').val() : null;

  var $tr = $('#sample').clone();
  $tr.removeAttr('id');
  $tr.children('.trans').text(transName);
  $tr.children('.date').text(formattedDate);
  $tr.children('.credit').text(deposit);
  $tr.children('.debit').text(withdrawal);
  $('#transList').append($tr);

  $('#balance').text(parseFloat($('#balance').text()) + parseFloat($('#transAmount').val()));
  $('#transName').val('');
  $('#transDate').val('');
  $('#transAmount').val('');
}

function deleteTrans() {
  $('#balance').text(parseFloat($('#balance').text()) - Number($(this).closest('tr').find('.amount').text()));
  $(this).closest('tr').remove();
}