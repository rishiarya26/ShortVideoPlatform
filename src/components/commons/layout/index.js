const Layout = props => (
  <div>
    {/* <div className="flex justify-end">
      <div className="flex justify-evenly">
        <div
          role="presentation"
          onClick={() => Router.pushState('repos')}
        >
          Git Hub
        </div>
        <span className="px-2">|</span>
        <div
          role="presentation"
          onClick={() => Router.pushState('feed')}
        >
          Feed
        </div>
        <span className="px-2">|</span>
        <div
          role="presentation"
          onClick={() => Router.pushState('error-boundary')}
        >
          Error Boundary
        </div>
      </div>
    </div> */}
    {props.children}
  </div>
);

export default Layout;
