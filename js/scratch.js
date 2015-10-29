jQuery(document)
  .ready(function () {
    var setTimer = function () {
      var time = Math.random() * 55000 + 5000;
      console.log(time);
      setTimeout(function () {
        var r = Math.random() * 91 + 9;
        var l = Math.floor(Math.random() * 2);
        if (l == 1) {
          $("#scratch")
            .css('right', 'auto')
            .css('left', '-110px')
            .removeClass('mirror');
          anobj1 = {
            left: '0'
          };
          anobj2 = {
            left: '-110'
          };
        } else {
          $("#scratch")
            .css('right', '-110px')
            .css('left', 'auto')
            .addClass('mirror');
          anobj1 = {
            right: '0'
          };
          anobj2 = {
            right: '-110'
          };
        }
        $("#scratch")
          .show()
          .css('top', r + '%')
          .animate(anobj1, 800, 'linear', function () {
            //completed
          })
          .animate(anobj2, 800, 'linear', function () {
            $("#scratch")
              .hide();
            setTimer();
          });
      }, time);
    };
    setTimer();
  });
