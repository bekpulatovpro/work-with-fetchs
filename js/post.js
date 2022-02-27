const elCommentsBtn=document.querySelector(".btn__back");
const elUserId = window.localStorage.getItem('userId');
const elPostsList=document.querySelector(".users__list");
const elPostsTemplate=document.querySelector(".posts__template").content;
const elBtn=document.querySelector(".log__out");
const token=window.localStorage.getItem('token');

if(!token){
    window.location.replace('login.html')
}

elBtn.addEventListener("click",()=>{
    window.localStorage.removeItem("token");
    window.location.replace("post.html");
})

elCommentsBtn.addEventListener("click",()=>{
    window.location.replace("index.html")
})


let post = [];





const renderPosts=(array,node)=>{
    node.innerHTML=null;
    const postFragment=document.createDocumentFragment()
    array.forEach(posts=>{
        const postTemplate=elPostsTemplate.cloneNode(true)

        postTemplate.querySelector(".posts__userId").textContent=posts.userId;
        postTemplate.querySelector(".posts__Id").textContent=posts.id;
        postTemplate.querySelector(".post__title").textContent=posts.title;
        postTemplate.querySelector(".posts__text").textContent=posts.body;
        postTemplate.querySelector(".more__posts__btn").textContent="more";
        postTemplate.querySelector(".more__posts__btn").dataset.id = posts.id;

        postFragment.appendChild(postTemplate)
    })
    elPostsList.appendChild(postFragment)
    
}



fetch('https://jsonplaceholder.typicode.com/posts')
.then((response)=>response.json())
.then((data)=>{

    post = data.filter((post)=>post.userId == elUserId )

    renderPosts(post,elPostsList)
})



elPostsList.addEventListener("click",(evt)=>{
    evt.preventDefault();
    
    const clickbtn = evt.target.matches('.more__posts__btn')
    
    if(clickbtn){

        const postId = evt.target.dataset.id
        
        window.localStorage.setItem('postId', postId)
        window.location.replace('comments.html')
    }
    })