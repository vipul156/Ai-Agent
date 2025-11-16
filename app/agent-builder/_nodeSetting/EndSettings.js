import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { useEffect } from 'react'

function EndSettings({ selectedNodes, updateFormData }) {
  const [formData, setFormData] = React.useState({
    schema : ''
  })

  useEffect(() => {
     selectedNodes.data.settings && setFormData(selectedNodes.data.settings)
    }, [selectedNodes])
  
    const handleChange = (key, value) => {
      setFormData({ ...formData, [key]: value })
    } 

  return (
    <div>
      <h2 className='font-bold'>End</h2>
      <p className='text-gray-600 mt-1'>Choose the workflow output</p>
      <div className='mt-2 space-y-2'>
        <Label>Output</Label>
        <Textarea value={formData?.schema} onChange={(event) => handleChange("schema", event.target.value)} placeholder='{name:string}' />
      </div>
      <Button onClick={() => updateFormData(formData)} className='w-full mt-3'>Save</Button>
    </div>
  )
}

export default EndSettings
