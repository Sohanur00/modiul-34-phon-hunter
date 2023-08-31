const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);

    const data = await res.json();
    const phones = data.data;
    // console.log(phones);

    displayPhones(phones,isShowAll);

}



const displayPhones = (phones,isShowAll) => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');

    // clear phone container cards  before  adding new cards

    phoneContainer.textContent = ' ';
    // disply show all button if where are more then 12 phones
    const showAllContainer = document.getElementById('show-all-conainer');
    if (phones.length > 12 && !isShowAll) {

        showAllContainer.classList.remove('hidden')

    } else {

        showAllContainer.classList.add('hidden')
    }
console.log('is show all',isShowAll)

    // display only frist only 12.....phone if not show all
 if(!isShowAll){
    phones = phones.slice(0, 12);
 }

    phones.forEach(phone => {

        console.log(phone);
        /**
         * 1.create a div
         * 3.set innerHtml
         */

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card  bg-gray-100 p-4 shadow-xl`;
        phoneCard.innerHTML = `

<figure class="px-10 pt-10">
<img src="${phone.image}" alt="" class="rounded-xl" />
</figure>
<div class="card-body items-center text-center">
<h2 class="card-title">${phone.phone_name}</h2>
<p>There are many variations of passages of available, but the majority have suffered</p>
<div class="card-actions">
  <button onclick="handleShowDetails('${phone.slug}');
 showDetails.showModal()" class="btn btn-primary">Show Details</button>
</div>
</div>

`;
        //4 . appendchild


        phoneContainer.appendChild(phoneCard)

    });
    // hide loading spiner 
    toggleLoadingSpiner(false);
}

const handleShowDetails = async (id) => {
console.log('phone details',id);
// load single data
const res = await fetch (`
https://openapi.programming-hero.com/api/phone/ ${id}`)

const data = await res.json();
console.log(data);

}





// handle search button 
const handleSearch = (isShowAll) => {
    toggleLoadingSpiner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText,isShowAll);



}

const toggleLoadingSpiner = (isLoading) => {
    const loadingSpiner = document.getElementById('loading-spiner');
    if (isLoading) {
        loadingSpiner.classList.remove('hidden')
    } else {

        loadingSpiner.classList.add('hidden')
    }


}

// handle show all 


const handleShowAll = () => {

    handleSearch(true);
   


}

loadPhone();