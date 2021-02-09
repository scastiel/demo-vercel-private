import fs from 'fs'
import path from 'path'

export default function Private({ privateContent }) {
  return (
    <>
      <p>Welcome to this private page!</p>
      <pre>{privateContent}</pre>
    </>
  )
}

export function getServerSideProps({ req, query }) {
  if (query.password === 'abc123') {
    const privateContent = fs.readFileSync(
      path.resolve('public/private.txt'),
      'utf-8'
    )
    return { props: { privateContent } }
  } else {
    return { redirect: { destination: '/login', permanent: false } }
  }
}
