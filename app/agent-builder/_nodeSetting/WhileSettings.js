import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Label } from '@/components/ui/label'

function WhileSettings({ selectedNodes, updateFormData }) {
    const [formData, setFormData] = React.useState({
        whileCondtion: '',
    })

    React.useEffect(() => {
        selectedNodes.data.settings && setFormData(selectedNodes.data.settings)
    }, [selectedNodes])

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }
    return (
        <div>
            <h2 className='font-bold'>While</h2>
            <p className='text-gray-600 mt-1'>
                Loop your workflow
            </p>
            <div className='mt-2 space-y-2'>
                <Label>While</Label>
                <Input value={formData?.whileCondtion} onChange={(event) => handleChange("whileCondtion", event.target.value)} placeholder='Enter condition' />
            </div>
            <Button onClick={() => updateFormData(formData)} className='w-full mt-3'>Save</Button>
        </div>
    )
}

export default WhileSettings
