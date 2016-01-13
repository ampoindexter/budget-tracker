'use strict'

$(document).ready(init);

function init() {
  var currentDate = moment().format('YYYY-MM-DD');
  $('#transDate').attr('min', currentDate);
  $('#newTrans').submit(addTrans);
  $('table').on('click', '.delete button', deleteTrans);
  $('#transHead').click(showAll);
  $('#credHead').click(showCredits);
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

  var $newBalance = parseFloat($('#balance').text()) + parseFloat($('#transAmount').val());
  $('#balance').text(Math.round($newBalance * 100) / 100);
  $('#transName').val('');
  $('#transDate').val('');
  $('#transAmount').val('');
}

function deleteTrans() {
  var $newBalance = parseFloat($('#balance').text()) - parseFloat($(this).closest('tr').find('.amount').text());
  $('#balance').text(Math.round($newBalance * 100) / 100);
  $(this).closest('tr').remove();
}

function showAll() {
  $('tbody#transList tr').show();
}

function showCredits() {
  if ($('tbody#transList tr').find('.credit').text()) {
    $('tbody#transList tr').show;
  }
}