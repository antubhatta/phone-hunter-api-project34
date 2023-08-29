// const loadPhone= async (searchText) =>{
//     const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
//     const data= await res.json()
//     const phones= data.data
//     // console.log(phone)
//     displayPhones(phones)
// }

// const displayPhones=phones=>{
//     const phoneContainer=document.getElementById('phone-container')
//     phoneContainer.textContent=''
//       // display show all button if there are more 12 phone
//       const showAllContainer=document.getElementById('show-all-container')
//       if(phones.length>12){
//         showAllContainer.classList.remove('hidden')
//       }
//       else{
//         showAllContainer.classList.add('hidden')
//       }
//     // display only first 12 phones
//     phones=phones.slice(0,12)
//     phones.forEach(phone=>{
//         // console.log(phone)
        
//         const phoneDiv=document.createElement('div')
//         phoneDiv.classList=`card w-96 bg-gray-100 shadow-xl`
//         phoneDiv.innerHTML=`<div class="card w-96 bg-gray-100 shadow-xl">
//         <figure><img src="${phone.image}"></figure>
//         <div class="card-body">
//           <h2 class="card-title">${phone.phone_name}</h2>
//           <p>If a dog chews shoes whose shoes does he choose?</p>
//           <div class="card-actions justify-center">
//             <button onclick='handleShowDetails("${phone.slug}")' class="btn btn-primary">Details</button>
//           </div>
//         </div>
//       </div>`
//       phoneContainer.appendChild(phoneDiv)
//     })
//     toggleLoadingSpinner(false)

// }
// // 
// const handleShowDetails= async(id)=>{
//     console.log(id)
//     const res= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
//     const data= await res.json()
//     console.log(data)
// } 
// const handleSearch=() =>{
//     toggleLoadingSpinner(true)
//    const searchField=document.getElementById('search-field')
//    const searchValue=searchField.value 
//    loadPhone(searchValue)
// }
// const toggleLoadingSpinner=(isloading)=>{
//     const toggleSpinner=document.getElementById('loadings-spinner')
//     if(isloading){
//         toggleSpinner.classList.remove('hidden')
//     }
//     else{
//         toggleSpinner.classList.add('hidden')
//     }
// }



const phoneLoader= async (searchText,isShowAll) =>{
    const res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data= await res.json()
    const phones= data.data
    phoneDisplay(phones,isShowAll)

}
const phoneDisplay= (phones,isShowAll)=>{
    const phoneContainer=document.getElementById('phone-container')
    // clear phone container cards before adding new cards
    phoneContainer.textContent=''
    // display show all button if there are more 12 phone
    const showAllContainer=document.getElementById('show-all-container')
    if(phones.length>12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    // display only first 12 phone is not show all
    if(!isShowAll){
        phones=phones.slice(0,12)
    }

    phones.forEach(phone =>{
        // 2.create a div
        const phoneDiv=document.createElement('div')
        phoneDiv.classList=`card bg-gray-100 shadow-xl`
        // 3.set inner html
        phoneDiv.innerHTML=`
        <figure class='pt-5'><img src="${phone.image}"></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Details</button>
                      </div>
                    </div>
        `
        // 4.appendChild
        phoneContainer.appendChild(phoneDiv)

    })
    toggleLoadingSpinner(false)
}
// show details
const handleShowDetails= async(id)=>{
    console.log('clicked th btn',id)
    // load single phone data
    const res= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data= await res.json()
    const phones=data.data
    showPhoneDisplay(phones)
} 
const showPhoneDisplay=(phones)=>{
    console.log(phones)
    const showDetailsTitle=document.getElementById('show-details-title')
    showDetailsTitle.innerText=phones.name

    const showDetailsContainer=document.getElementById('show-details-container')
    showDetailsContainer.innerHTML=`
    <img class="m-4 p-4" src="${phones.image}">
    <p><span>Brand:</span>${phones.brand}</p>
    <p><span class="">Storage:</span>>${phones?.mainFeatures?.storage}</p>
    <p><span>Display-Size:</span>${phones?.mainFeatures?.displaySize}</p>
    <p><span>ChipSet:</span>${phones?.mainFeatures?.chipSet}</p>
    <p><span>ReleaseDate:</span>${phones.releaseDate}</p>
    <p><span>Slug:</span>${phones.slug}</p>
    `

    // show the modal
    show_details_modal.showModal()
}

const handleSearch=(isShowAll)=>{
    toggleLoadingSpinner(true)
    const searchField= document.getElementById('search-field')
    const searchValue= searchField.value
    phoneLoader(searchValue,isShowAll)
}

const toggleLoadingSpinner = (isloading) =>{
    const loadingSpinner= document.getElementById('loadings-spinner')
    if(isloading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }

}
const handleShowAll= () =>{
    handleSearch(true)

}
