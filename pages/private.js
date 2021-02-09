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
    const dir = path.resolve('content')
    const files = fs.readdirSync(dir)

    let privateContent = ''
    for (const file of files) {
      privateContent += file + ':\n'
      privateContent += fs.readFileSync(path.join(dir, file))
      privateContent += '\n'
    }

    return { props: { privateContent } }
  } else {
    return { redirect: { destination: '/login', permanent: false } }
  }
}
