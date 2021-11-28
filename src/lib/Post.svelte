<script>
  import Error from '$lib/Error.svelte'
  import {createComment, createLike, getUser} from '$lib/services'

  export let id, user, content, likes = 0, comments = [], publicURL = null

  let commentContent = ''
  let createCommentPromise = Promise.resolve({})
  function addComment() {
    createCommentPromise = createComment({user: getUser().email, post: id, content: commentContent})
      .then(({data, error}) => {
        commentContent = ''
        comments = [...data, ...comments]
        return {data, error}
      })
    
  }

  function addLike() {
    likes += 1
    createLike({user: getUser().email, post: id})  
  }
</script>

<article class="card shadow-sm mt-8">
  {#if publicURL}
    <figure>
      <img src={publicURL}>
    </figure> 
  {/if}
  <div class="card-body">
    <h2 class="card-title">{user} says..</h2> 
    <p>{content}</p> 
    <div class="card-actions flex justify-between">
      {#await createCommentPromise}
        Posting comment..
      {:then {data, error}}
        <Error {error} />
        {#if data}
          Thanks for creating an insightful and kind comment!
        {/if}
        <form class="form-control" on:submit|preventDefault={addComment}>
          <div class="flex space-x-2">
            <input bind:value={commentContent} type="text"  class="w-full input input-primary input-bordered"> 
            <button class="btn btn-primary">Comment</button>
          </div>
        </form>
      {/await}
      <button on:click={addLike} class="btn btn-secondary">{likes} {likes === 1 ? 'Like' : 'Likes'}</button>
    </div>
    {#each comments as comment}
      {comment.user} says.. <q>{comment.content}</q>
    {/each}
  </div>
</article>