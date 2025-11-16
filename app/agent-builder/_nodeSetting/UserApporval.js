import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FileJson } from 'lucide-react'

function UserApporval({selectedNodes, updateFormData}) {
  const [formData, setFormData] = React.useState({
          name: '',
          message: '',
      })
  
      React.useEffect(() => {
          selectedNodes.data.settings && setFormData(selectedNodes.data.settings)
      }, [selectedNodes])
  
      const handleChange = (key, value) => {
          setFormData({ ...formData, [key]: value })
      }
  return (
    <div>
      <h2 className='font-bold'>User Apporval</h2>
      <p className='text-gray-600 mt-1'>
        Pause for a human to approve or reject
      </p>
      <div className='mt-3 space-y-1'>
        <Label>Name</Label>
        <Input value={formData?.name} onChange={(event) => handleChange("name", event.target.value)} placeholder='Name' />
      </div>
      <div className='mt-3 space-y-1'>
        <Label>Message</Label>
        <Textarea value={formData?.message} onChange={(event) => handleChange("message", event.target.value)} placeholder='Describe the message to show to the user' />
        <h2 className='text-sm p-1 flex items-center gap-2 '>Add Context <FileJson className='h-3 w-3'></FileJson></h2>
      </div>
      <Button onClick={() => updateFormData(formData)} className='w-full mt-3'>Save</Button>
    </div>
  )
}

export default UserApporval
