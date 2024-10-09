import './styles.scss'
export function Loader() {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="loading loading--plane" title="Loading">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113.5 104">
            <path
              d="M97.7 41.5c16.3 0 16.3 21-.2 21H66.7l-26 38H29.2l14.1-38h-23l-7.8 10h-9L8.2 52 3.5 31.5h9l7.8 10h23.1l-14.1-38h11.4l26 38h31z"
              fill="none"
              stroke="#006970"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
