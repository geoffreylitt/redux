import React from 'react'
import Header from '../containers/Header'
import MainSection from '../containers/MainSection'
import WcTable from '../wildcard/WcTableContainer'

// Adding Wildcard here won't be necessary in the real extension version;
// we're just showing the table within the app's component hierarchy
// for now for convenience.
const App = () => (
  <div>
    <Header />
    <MainSection />
    <WcTable />
  </div>
)

export default App
