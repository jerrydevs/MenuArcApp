import React from 'react'
import { Form, Input, Button } from 'reactstrap'

const UploadCSV = () => {
  return (
    <div>
      <Form id="uploadForm" method="POST">
        <Input type="file" id="file" />
        <Input type="submit" value="Submit" />
      </Form>
    </div>
  )
}

export default UploadCSV
