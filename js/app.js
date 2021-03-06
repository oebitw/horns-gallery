'use strict';

////////////////////////////
///// Global Variables ////
//////////////////////////

let all = [];
let optionsArr=[];
let pageNumber = 1;



//////////////////////////////
///// Get Data From JSON ////
////////////////////////////

getData(pageNumber);

function getData (pageNumbers){

  $.get(`data/page-${pageNumbers}.json`, function(data){
    data.forEach(element => {
      let newImg = new Gallery (element.image_url, element.title, element.description, element.keyword, element.horns);
      newImg.render();
    });
    options(optionsArr);
  });


}


//////////////////////////////////////
///// Constructor and prototypes ////
////////////////////////////////////


function Gallery (image_url, title, description, keyword, horns ){

  this.image_url=image_url;
  this.title=title;
  this.description=description;
  this.keyword=keyword;
  this.horns= horns;

  all.push(this);
  optionsArr.push(keyword);

}

// Rendering The templates

Gallery.prototype.render = function(){

  let galleryBox = $('#imageTemplate').html();
  let renderedBox =  Mustache.render(galleryBox,this, console.log(this));
  $('main').append(renderedBox);

};





/////////////////////////
// Filter By KeyWord ///
///////////////////////


// Adding keywords (<options>) to <select> element


function options(array){

  let preventRepeat = Array.from(new Set(array));
  console.log(preventRepeat);

  preventRepeat.forEach(
    element =>{

      $('select').append(`<option value="${element}">${element}</option>`);

    }
  );

}

// View the images of the selected option
viewSelected();
function viewSelected() {

  $('select').change(function () {
    let selectedElement = $(this).val();
    $('section').hide();
    $(`.${selectedElement}`).fadeIn(100);
  });
}


/////////////////////////
// Sort By KeyWord   ///
///////////////////////

// Add event Listener

$('#sortKeyword').click(handleSubmitKeyword);

// Handle Submit


function handleSubmitKeyword(){


  all.sort(function (a, b) {
    return a.keyword.localeCompare(b.keyword);
  });




  $('section').fadeOut(300);



  const mainPage = document.querySelector('main');

  for(let i=0; i<all.length; i++){
    const parentElement = document.createElement('section');
    mainPage.appendChild(parentElement);

    const keywordElement = document.createElement('h2');
    parentElement.appendChild(keywordElement);
    keywordElement.textContent=`${all[i].keyword}`;

    const imgElement = document.createElement('img');
    parentElement.appendChild(imgElement);
    imgElement.setAttribute( 'src', `${all[i].image_url}` );

    const titleElement = document.createElement('h3');
    parentElement.appendChild(titleElement);
    titleElement.textContent=`${all[i].title}`;

    const numHorns = document.createElement('h4');
    parentElement.appendChild(numHorns);
    numHorns.textContent=`Number Of Horns: ${all[i].horns}`;
  }

}


////////////////////////////////
// Sort By Number of Horns  ///
//////////////////////////////

// Add event Listener

$('#sortHorns').click(handleSubmitHorns);

// Handle Submit

function handleSubmitHorns(){



  all.sort(function (a, b) {
    return a.horns - b.horns;
  });

  $('section').fadeOut(300);


  const mainPage = document.querySelector('main');


  for(let i=0; i<all.length; i++){
    const parentElement = document.createElement('section');
    mainPage.appendChild(parentElement);

    const hornsElement = document.createElement('h2');
    parentElement.appendChild(hornsElement);
    hornsElement.textContent=`Number Of Horns: ${all[i].horns}`;

    const imgElement = document.createElement('img');
    parentElement.appendChild(imgElement);
    imgElement.setAttribute( 'src', `${all[i].image_url}` );

    const titleElement = document.createElement('h3');
    parentElement.appendChild(titleElement);
    titleElement.textContent=`${all[i].title}`;


    const keywordElement = document.createElement('h4');
    parentElement.appendChild(keywordElement);
    keywordElement.textContent=`Number Of Horns: ${all[i].keyword}`;







  }

}

//////////////////
///// Pages  ////
////////////////

// Add event Listener
$('#page1').click(selectedPage(1));
$('#page2').click(selectedPage(2));

function selectedPage (number){

  return function () {

    all = [];
    console.log('secondPageAll', all);
    optionsArr = [];
    console.log('secondPageOptions', optionsArr);
    $('section').fadeOut(300, function() { $(this).remove(); });
    $('option').not(':eq( 0 )').remove();
    pageNumber = number;
    getData(pageNumber);
    console.log(optionsArr);

  };

}


//////////////////
///// Invoke ////
////////////////

console.log(all);
console.log(optionsArr);

