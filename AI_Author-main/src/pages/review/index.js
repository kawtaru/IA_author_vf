import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import axios from 'axios'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsReview from 'src/views/form-layouts/FormLayoutsReview'
import Result from './Result'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const FormLayouts = ({}) => {

  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const checkText = (text) => {
    const regex = `\n  generate a long revision content title, abstract, keywords,  introduction, existent works forms references, comparative study and conclusion from this text : ${text} \n`
    setLoading(true)
    axios.post('http://localhost:8000/check', {text: regex}).then(res => {
      console.log('res', res)
      setResult(res.data.Text)
      setLoading(false)
    })
  }

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <FormLayoutsReview loading={loading} onCheck={(text) => checkText(text)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Result result={result} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
