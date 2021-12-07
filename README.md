# Qwitter

## Disclaimer
I didn't finish the README but please reference the video!
[Video](https://www.youtube.com/watch?v=mPQyckogDYc)

## Made with
- Sveltekit
- Supabase
- DaisyUI (TailwindCSS)
## Todo
### A. Setup Sveltekit project
1. `$ npm init svelte@next` (for prompt: Skeleton, no, no, no)
2. `$ npx svelte-add@latest tailwindcss`
3. `$ npm install`
4. `$ npm install daisyui`
5. Add `require('daisyui')` to `plugins` in `tailwind.config.cjs`
	(like: `plugins: [require('daisyui')],`)
### B. Setup Supabase project
1. Create new Project
2. Add src/lib/supabase.js file and add the supabase url and public key
```
import { createClient } from  '@supabase/supabase-js'

const  SUPABSE_URL = ''
const  SUPABASE_PUBLIC_KEY = ''

const supabase = createClient(SUPABSE_URL, SUPABASE_PUBLIC_KEY)
export default supabase
```

### C. Some Random Things..
1. (Optional) Disable need to Confirm Email under Authentication > Settings
2. (Optional) [Choose a theme](https://daisyui.com/docs/default-themes) and add it to src/app.html like `<html  lang="en"  data-theme="cupcake">`
3. Add the following to your supabase.js file
 ```
import {goto} from '$app/navigation'
supabase.auth.onAuthStateChange((event) => {
	if (event === 'SIGNED_IN') {
		goto('/')
	} else  if (event === 'SIGNED_OUT') {
		goto('/login')
	}
})
```

4. Add a src/lib/Error.svelte component
```
<script>
	export let error
</script>

{#if  error}
	<strong  class="text-red-600">{error.message}</strong>
{/if}
```

4.  Add a main.container to src/routes/__layout.svelte
```
<main  class="container mx-auto p-8 max-w-2xl">
	<slot  />
</main>
```

### D. Setup Login Page
1. Add a src/lib/services.js file
```
import supabase  from  './supabase'

export function getUser() {
	return supabase.auth.user()
}

export async function signIn({email}) {
	const {error} = await supabase.auth
		.signIn({email})
	return {data: !error, error}
}

export async function signOut() {
	const {error} = await supabase.auth
		.signOut()
	return {data: !error, error}
}
```
2. Add a src/routes/login.svelte page
```
<script>
	import {browser} from '$app/env'
	import {goto} from '$app/navigation'
	import {getUser, signIn} from '$lib/services'
	import Error from '$lib/Error.svelte'

	const user = getUser()
	if (browser && user) goto('/')
</script>
```
3. Use an [Input with Button](https://daisyui.com/components/form/input) (scroll down) for the Magic Link
4. Add in form/promise logic to handle the signin (See video or login.svelte file)

### E. Add CreatePost.svelte
1. Create posts schema in Supabase (user, content)
2. Add to services.js
```
export async function createPost({content, user}) { // user is user's email
	const {data, error} = await supabase
		.from('posts')
		.insert({content, user})
	return {data, error}
}
```
3. Add src/lib/CreatePost.svelte (See video or CreatePost.svelte)

### F. Add Post.svelte
1. Add to services.js
```
export async function createLike({post, user}) { // post is post's id
	const {data, error} = await supabase
		.from('likes')
		.insert({post, user})
	return {data, error}
}

export async function createComment({post, user, content}) {
	const {data, error} = await supabase
		.from('comments')
		.insert({post, user, content})
	return {data, error}
}
```
2. Add src/lib/Post.svelte (See video or Post.svelte)
3. Use a [Card without Image](https://daisyui.com/components/card) (scroll down)
