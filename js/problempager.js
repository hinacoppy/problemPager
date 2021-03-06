// problempager.js
// include from problempager html (ProblemPager/[C]/{CAT}/{NUM}.html)

//回答、解説を最初は非表示にする
$('.answerscore').hide();
$('.description').hide();
$('.gnuanalysis').hide();
if (!showpipflg) { $('.pipinfo').hide(); }

//範囲を超えて移動できないようにする
$("#selectfirst, #selectprev").prop('disabled', (probnum == "01"));
$("#selectlast,  #selectnext").prop('disabled', (probnum == "50"));

$(function() {

  //ナビゲーションボタンがクリックされたときは、ボタンIDで処理を振り分け
  $('button').on('click',  function(e){
    switch ( $(this).attr("id") ) {
    case 'selectfirst':
      move_page("01", 0);
      break;
    case 'selectlast':
      move_page("50", 0);
      break;
    case 'selectnext':
      move_page(probnum, +1);
      break;
    case 'selectprev':
      move_page(probnum, -1);
      break;
    }
  });

  //キー操作でページ遷移 / 回答解説の表示切替え
  $('.container').on('keydown', function(e) { 
    switch ( e.keyCode ) {
    case 37: // ←
      move_page(probnum, -1);
      break;
    case 39: // →
      move_page(probnum, +1);
      break;
    case 38: // ↑
      description("hide");
      break;
    case 40: // ↓
      description("show");
      break;
    case 13: // Enter
      description("toggle"); //Enterキーは回答・解説の表示/非表示を切替え
      break;
    case 32: // Space
      $('#gnuanalysis').toggle(); //SpaceキーはGnuBG解析結果の表示/非表示を切替え
      break;
    default:
      return false; //何もしない
    }
    return false;
  });

  //[Description]ボタンか、ボードのクリックで、回答、解説の表示/非表示を切替え
  $('#showanswer, #board').on('click', function(e){
    description("toggle");
    if(window != window.parent) {
      window.parent.resize_iframe(); //iframeで呼ばれているときは親画面の関数を実行する
    }
  });

  //[Analysis Result]ボタンで、解析結果を表示/非表示を切替え
  $('#analyse').on('click', function(e){
    $('#gnuanalysis').toggle();
  });

  //[Home]ボタンで、メニューに遷移
  $('#return2menu').on('click', function(e){
    window.location.href = "../../index.html";
  });

  //画面の大きさが変わったときはボードを再描画
  $(window).on('resize', function(e){
    board.redraw();
  });
});

function move_page(probnum, delta) {
  const nextpage = Number(probnum) + delta;
  if (nextpage <= 0 || nextpage > 50) { return; } 
  const pn = ("00" + String(nextpage)).substr(-2);
  window.location.href = "./" + pn + ".html";
}

function description(action) {
  switch (action) {
  case "show":
    $('.answerscore').show();
    $('.description').show();
    if (!showpipflg) { $('.pipinfo').show(); }
    break;
  case "hide":
    $('.answerscore').hide();
    $('.description').hide();
    if (!showpipflg) { $('.pipinfo').hide(); }
    break;
  case "toggle":
    $('.answerscore').toggle();
    $('.description').toggle();
    if (!showpipflg) { $('.pipinfo').toggle(); }
    break;
  }
}
