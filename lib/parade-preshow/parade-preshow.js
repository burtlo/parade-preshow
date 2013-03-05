$(document).ready(function() {

  // Setup the 'p' key to launch the preshow

  MainKeyboard.on('p', function(){
    $.publish("presentation:preshow:toggle");
  });

  // Have the presentation to hide it's footer when the pre-show starts

  $.subscribe("presentation:preshow:start",$.proxy(function() {
    this.footer.hide();
  },presentation));

  // Have the presentation show the footer and show the current slide
  // when the pre-show ends.

  $.subscribe("presentation:preshow:stop",$.proxy(function() {
    this.footer.show();

    // Returning from a presentation requires the presentation frame to
    // be rebuilt.

    this.presentationFrame.cycle({
      timeout: 0
    });
    this.showSlide();

  },presentation));


  window.Preshow = Spine.Class.create({
    init: function() {
      this.element = $(arguments[0]);
      this.secondsToRun = parseFloat(arguments[1] * 60);

      $.subscribe("presentation:preshow:toggle",$.proxy(function() {
        this.toggle();
      },this));

    },
    preshowRunning: false,
    start: function() {

      if (this.preshowIntervalReference) {
        return;
      }

      this.preservePresentationSpace();

      this.load();

      this.images = this.element.children("img");

      this.currentImageIndex = 0;
      this.totalImages = this.images.size();


      this.preshowRunning = true;

      $.publish("presentation:preshow:start");

      this.currentRunTime = 0;
      this.currentRemainingTime = this.secondsToRun;

      this.nextImage();
      this.preshowIntervalReference = setInterval($.proxy(this.perform,this),1000);

    },
    preservePresentationSpace: function() {
      this.storedPresentationSpace = this.element.html();
    },
    restorePresentationSpace: function() {
      this.element.empty();
      this.element.html(this.storedPresentationSpace);
    },
    displayImagesInterval: 5,
    perform: function() {
      this.currentRunTime ++;
      this.currentRemainingTime --;

      time = this.secondsToTime(this.currentRemainingTime);

      $('#preshow_timer').text(time + ' to go-time')
      var description = this.preshowDescription && this.preshowDescription[tmpImg.attr("ref")]

      if(description) {
        $('#tips').show();
        $('#tips').text(description);
      } else {
        $('#tips').hide();
      }

      if ((this.currentRunTime % this.displayImagesInterval) == 0) {
        this.nextImage();
      }

      this.preshowTip();

      if (this.currentRemainingTime <= 0) {
        this.stop();
      }

    },
    stop: function() {

      if (!this.preshowIntervalReference) {
        return;
      }

      this.preshowRunning = false;
      window.clearInterval(this.preshowIntervalReference);
      this.preshowIntervalReference = undefined;

      $('#preshow').remove();
      $('#tips').remove();
      $('#preshow_timer').remove();

      this.restorePresentationSpace();

      $.publish("presentation:preshow:stop");

    },
    toggle: function() {

      if (this.preshowIntervalReference) {
        this.stop();
      } else {
        this.start();
      }

    },
    preshowPath: "preshow",
    load: function() {

      $.getJSON(this.preshowPath, false, $.proxy(function(data) {

        this.element.after("<div id='preshow'></div><div id='tips'></div><div id='preshow_timer'></div>")

        $.each(data, $.proxy(function(i, n) {
          if(n == "preshow.json") {
            // has a descriptions file
            $.getJSON("/file/preshow/preshow.json", false, function(data) {
              this.preshowDescription = data;
            })
          } else {
            $('#preshow').append('<img ref="' + n + '" src="/file/preshow/' + n + '"/>');
            this.images = $("#preshow > img");
            this.totalImages = this.images.size();
          }
        },this));

      },this));

    },
    nextImage: function() {
      this.currentImageIndex ++;
      if((this.currentImageIndex + 1) > this.totalImages) {
        this.currentImageIndex = 0;
      }

      this.element.empty();
      tmpImg = this.images.eq(this.currentImageIndex).clone();
      $(tmpImg).attr('width', '1020');
      this.element.html(tmpImg);
    },
    preshowTip: function() {

    },
    secondsToTime: function(seconds) {
      minutes = Math.floor(seconds / 60)
      seconds = seconds - (minutes * 60)
      if(seconds < 10) {
        seconds = "0" + seconds
      }
      return minutes + ":" + seconds
    }
  });

  preshow = new Preshow("#preso",0.25);

});