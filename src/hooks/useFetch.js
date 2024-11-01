import { useEffect } from "react"
import { useState } from "react"
import { useUser } from "../UserContext"

function useFetch(url) {
  const [user] = useUser()
  const [content, setContent] = useState(null)
console.log(JSON.stringify(user));

  const headers = {}
  if (user?.token) headers.Authorization = user?.token
console.log("headers", headers);

  useEffect(() => {
    fetch(url, { headers })
      .then(res => res.json())
      .then(data => setContent(data))
  }, [url, user?.token])

  return content
}

export default useFetch
