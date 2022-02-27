const elList=document.querySelector(".users__list");
const elTemplate=document.querySelector(".users__template").content;




const token=window.localStorage.getItem('token');
const elBtn=document.querySelector(".log__out");

if(!token){
    window.location.replace('login.html')
}

elBtn.addEventListener("click",()=>{
    window.localStorage.removeItem("token");
    window.location.replace("index.html");
})



const renderUsers=(array,node)=>{
    node.innerHTML=null;
    const usersFragment=document.createDocumentFragment()
    array.forEach((row)=>{
        const userTemplate=elTemplate.cloneNode(true)
        userTemplate.querySelector(".users__number").textContent=row.id
        userTemplate.querySelector(".users__name").textContent=row.name
        userTemplate.querySelector(".users__email").textContent=row.email
        userTemplate.querySelector(".users__inner__title").textContent=row.address.street
        userTemplate.querySelector(".users__inner__text").textContent=row.address.suite
        userTemplate.querySelector(".users__inner__city").textContent=row.address.city
        userTemplate.querySelector(".users__inner__number").textContent=row.address.zipcode
        userTemplate.querySelector(".users__telephone__number").textContent=row.phone
        userTemplate.querySelector(".users__website").textContent=row.website
        userTemplate.querySelector(".users__company__name").textContent=row.company.name
        userTemplate.querySelector(".users__company__catch").textContent=row.company.catchPhrase;
        userTemplate.querySelector(".users__company__bs").textContent=row.company.bs;
        userTemplate.querySelector(".more__btn").textContent='more';
        userTemplate.querySelector(".more__btn").dataset.userId=row.id;
    
        usersFragment.appendChild(userTemplate)
        
    })
    elList.appendChild(usersFragment)
    

}
fetch("https://jsonplaceholder.typicode.com/users")
.then((response)=>response.json())
.then((data)=>{
    if(data?.length>0){
        renderUsers(data,elList)
    }
}) 



elList.addEventListener("click",(evt)=>{
evt.preventDefault();

const clickbtn = evt.target.matches('.more__btn')

if(clickbtn){
    const Eltarget=evt.target.dataset.userId
    
    window.localStorage.setItem('userId',Eltarget)
    window.location.replace('post.html')
}
})