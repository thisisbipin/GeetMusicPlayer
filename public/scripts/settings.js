$('#settings-icon').click(function () {
    $('#settings').toggle();
})

$('.fa-minus-square').click(() => updateImage(-1));
$('.fa-plus-square').click(() => updateImage(1));
$("#particle-checkbox").prop('checked', true);
loadParticles();

$("#particle-checkbox").click(() => {
    if ($('#particle-checkbox').is(":checked"))
        loadParticles();
    else
        loadParticles(false);
});

$('#clock-checkbox').prop('checked', true);
$('#clock-checkbox').click(() => $('#clock-id').toggle())

$('#settings-close').click(() => $('#settings').hide())