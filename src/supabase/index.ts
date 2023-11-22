import { createClient } from '@supabase/supabase-js';

export const supabase = createClient('https://hahseunteivsggxdkwdo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhaHNldW50ZWl2c2dneGRrd2RvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDUxOTQzOSwiZXhwIjoyMDE2MDk1NDM5fQ.ubZtftnOkFzuxKcczpeW9MAluccUZai0XGIAiVceH4M');


export const getUrlImage = async (name: string): Promise<string> => {
    const {data, error} =  await supabase.storage
    .from('avatars')
    .createSignedUrl(name, 31536000)
    if(error) throw Error('Error al obtener la imagen supabase');
    const urlPhoto = data.signedUrl
    return urlPhoto as string;
}