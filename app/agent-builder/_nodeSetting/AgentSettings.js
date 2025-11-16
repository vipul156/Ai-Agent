import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectItem, SelectValue, SelectContent, SelectTrigger } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { FileJson } from 'lucide-react'
import React, { useEffect } from 'react'

function AgentSettings({ selectedNodes, updateFormData }) {
  const [formData, setFormData] = React.useState({
    name: '',
    instructions: '',
    includeChatHistory: true,
    model: 'gemini-flash-1.5',
    output : 'text',
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
      <h2 className='font-bold'>Agent Settings</h2>
      <p className='text-gray-600 mt-1'>Call the AI model with your instructions</p>
      <div className='mt-3 space-y-1'>
        <Label>Name</Label>
        <Input value={formData?.name} onChange={(event) => handleChange("name", event.target.value)} placeholder='Agent Name' />
      </div>
      <div className='mt-3 space-y-1'>
        <Label>Instructions</Label>
        <Textarea  value={formData?.instructions} onChange={(event) => handleChange("instructions", event.target.value)}  placeholder='Instructions' />
        <h2 className='text-sm p-1 flex items-center gap-2 '>Add Context <FileJson className='h-3 w-3'></FileJson></h2>
      </div>
      <div className='mt-3 flex justify-between items-center'>
        <Label>Remove Chat History</Label>
        <Switch checked={formData?.includeChatHistory} onCheckedChange={(checked) => handleChange("includeChatHistory", checked)} />
      </div>
      <div className='mt-3 flex justify-between items-center'>
        <Label>Model</Label>
        <Select value={formData?.model} onChange={(value) => handleChange("model", value)}>
          <SelectTrigger>
            <SelectValue placeholder='gemini-flash-1.5' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='gemini-flash-1.5'>gemini-flash-1.5</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='my-3 space-y-2'>
        <Label>Output Format</Label>
        <Tabs defaultValue="Text" className="w-[400px]" value={formData?.output} onValueChange={(value) => handleChange("output", value)}>
          <TabsList>
            <TabsTrigger value="Text">Text</TabsTrigger>
            <TabsTrigger value="Json">Json</TabsTrigger>
          </TabsList>
          <TabsContent value="Text">
            <h2 className='text-sm text-gray-400'>Output will be text</h2>
          </TabsContent>
          <TabsContent value="Json">
            <Label className='text-sm text-gray-500'>Enter Json Format</Label>
            <Textarea value={formData?.schema} onChange={(event) => handleChange("schema", event.target.value)} placeholder='{title:string}' className='max-w-[300px] mt-1' />
          </TabsContent>
        </Tabs>
      </div>
      <Button className="w-full" onClick={() => updateFormData(formData)}>Save</Button>
    </div>
  )
}

export default AgentSettings
