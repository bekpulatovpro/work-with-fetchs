const elCommentsBtn=document.querySelector(".btn__back");
const elCommentsTemplate=document.querySelector(".comments__template").content;
const elCommentsList=document.querySelector(".comments__list");

let comments=[]

const elPostId = window.localStorage.getItem('postId');

elCommentsBtn.addEventListener("click",()=>{
    window.location.replace("post.html")
})

renderComments=(array,node)=>{
    node.innerHTML=null;

    const commentsFragment=document.createDocumentFragment()
    array.forEach(comments=>{
        const commentsTemplate=elCommentsTemplate.cloneNode(true);


        commentsTemplate.querySelector(".comment__postid").textContent=comments.postId
        commentsTemplate.querySelector(".comment__id").textContent=comments.id
        commentsTemplate.querySelector(".comment__name").textContent=comments.name
        commentsTemplate.querySelector(".comment__email").textContent=comments.email
        commentsTemplate.querySelector(".comments__body").textContent=comments.body;

        commentsFragment.appendChild(commentsTemplate)
    })
    elCommentsList.appendChild(commentsFragment)
}



fetch("https://jsonplaceholder.typicode.com/comments")
.then((response)=>response.json())
.then((data)=>{
    
    comments=data.filter((comments)=>comments.postId==elPostId)
    
    renderComments(comments,elCommentsList)
})