import React from "react"

const ListPagination = props => {
  if(props.articlesCount===0){
    return null
  }
  const range = [];
  for(let i = 1; i< Math.ceil(props.articlesCount/10);++i){
    range.push(i)
  }

  const setPage =  page => props.onSetPage(page)

  return(
    <nav>
      <ul className="pagination">
        {
          range.map(v => {
            const isCurrent = v === props.currentPage
            const onClick = ev => {
              ev.preventDefault()
              setPage(v)
            }
            return(
              <li
                className={ isCurrent ? 'page-item active' : 'page-item' }
                onClick={onClick}
                key={v.toString()}>

                <a className="page-link" href="">{v}</a>

              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}

export default ListPagination