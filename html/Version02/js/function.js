$(document).ready(function(e) {
	
	/*left menu tree function*/
	var width=$('.menu_toggle').width()
	$('.menu_toggle').css('left','-'+width+'px')
	$('.menu_btn, .togout_menu').click(
		function (e) {
		  
		  var windowWidth= $(window).width()
		  if (windowWidth < 979){
			  $(".togout_menu").show();
			  if($(this).hasClass('menu_btn')){
				$('.togout_menu').removeClass('active');
				$('.menu_btn').addClass('active')
				}
			  if($(this).hasClass('togout_menu')){
					$('.menu_btn').removeClass('active')
					//$('.togout_menu').addClass('active')
				}
		  }else{
			  $(this).toggleClass('active')
			  }
		 
		  if($(this).hasClass('active')){
			$(this).parents('body').find('.menu_toggle').animate({left:'0px'},700);
			if (windowWidth > 979){
				$(this).parents('body').find('header').animate({paddingLeft:width+'px'}, 700);
			}
		  }
		  else{
			$(this).parents('body').find('.menu_toggle').animate({left:'-'+width+'px'},700);
			if (windowWidth > 979){
				$(this).parents('body').find('header').animate({paddingLeft:'0px'}, 700);
			}
		  }
		}
	);
	$.fn.extend({
    treed: function (o) {
      
      var openedClass = 'glyphicon-minus-sign';
      var closedClass = 'glyphicon-plus-sign';
      
      if (typeof o != 'undefined'){
        if (typeof o.openedClass != 'undefined'){
        openedClass = o.openedClass;
        }
        if (typeof o.closedClass != 'undefined'){
        closedClass = o.closedClass;
        }
      };
      
        //initialize each of the top levels
        var tree = $(this);
        tree.addClass("tree");
        tree.find('li').has("ul").each(function () {
            var branch = $(this); //li with children ul
            branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
            branch.addClass('branch');
            branch.on('click', function (e) {
				
                if (this == e.target) {
                    var icon = $(this).children('i:first');
                    icon.toggleClass(openedClass + " " + closedClass);
                    $(this).children().children().slideToggle();
					//tree.find(this).addClass('active');
                }
            })			
            branch.children().children().toggle();
        });
        //fire event from the dynamically added icon
      tree.find('.branch .indicator').each(function(){
        $(this).on('click', function () {
            $(this).closest('li').click();
        });
      });
        //fire event to open branch if the li contains an anchor instead of text
        tree.find('.branch>a').each(function () {
            $(this).on('click', function (e) {
                $(this).closest('li').click();
                e.preventDefault();
            });
        });
        //fire event to open branch if the li contains a button instead of text
        tree.find('.branch>button').each(function () {
            $(this).on('click', function (e) {
                $(this).closest('li').click();
                e.preventDefault();
            });
        });
    }
});
//Initialization of treeviews
$('#tree3').treed({openedClass:'glyphicon-chevron-right', closedClass:'glyphicon-chevron-down'});
/*left menu tree function end*/
/*entity and assessment content show*/
$(".btnSave").click(
	function () {
		  $("#commt-box2").hide();
		  $("#commt-box").fadeIn('2000');			
	}            
);
$(".btnSave2").click(
	function () {
		$("#commt-box").hide();
		 $("#commt-box2").fadeIn('2000');			 
	}            
);
$(".close-btn").click(
	function () {
		$("#commt-box").hide();
		$("#commt-box2").hide();
	}            
);
/*entity and assessment content show end*/

$(".setting_ic").click(function (){
	$(".setmenu_outerwrap").slideToggle(600);
});

/* append row into table */ 
$(".add_btn").bind('click', function(){
	$('table').find('tbody').append('<tr><td><input class="form-control" id="inputdefault" placeholder="Asset Details" type="text"></td><td><input class="form-control" id="inputdefault" placeholder="Asset Category" type="text"></td><td><div class="dropdown"> <a href="#" data-toggle="dropdown" class="dropdown-toggle">Criticality </a><ul class="dropdown-menu"><li><a href="#">Action</a></li><li><a href="#">Another action</a></li></ul></div></td></tr>')	
})
/* append row into table end*/

/* editor start */ 
$(function()
{
	
	$('.content').redactor({
		focus: true,
		plugins: ['fontfamily', 'fontsize', 'table', 'fullscreen', 'imagemanager', 'clips', 'fontcolor', 'textexpander'],
		imageUpload: '/upload.php',
		imageManagerJson: '/images/images.json',
		textexpander: [
			['lorem', 'Lorem ipsum...'],
			['text', 'Text']
		]		
	});
	$('redactor-editor')
	
});
/* editor start end*/ 

/* tab slide animation */
$("#tabs-left,#tabs-right").show();
!function( $ ){

  "use strict"

 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function ( element ) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active a').last()[0]

      $this.trigger({
        type: 'show'
      , relatedTarget: previous
      })

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.is('.fade, .slide-left, .slide-right, .slide-up, .slide-down')

      function next() {
          
        $active
          .removeClass('active in')
          .find('> .dropdown-menu > .active')
          .removeClass('active in')

        element.addClass('active')

        if (transition) {
            element[0].offsetWidth // reflow for transition
            element.removeClass('out').addClass('in')
        } else {
          element.removeClass('fade slide-left slide-right slide-up slide-down')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next();

        var nextLoc = element.siblings().andSelf().index(element);
        var currLoc = $active.siblings().andSelf().index($active);
        
        if(nextLoc > currLoc){
            $active.removeClass('in').addClass('out');
            $active.next().removeClass('out in');
        }
        else
            $active.removeClass('out in');
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB DATA-API
  * ============ */

  $(function () {
    $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
  })

}( window.jQuery );
<!-- tab slide animation -->			
});