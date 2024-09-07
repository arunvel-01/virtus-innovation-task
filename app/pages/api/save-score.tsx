// import { NextApiRequest, NextApiResponse } from 'next';
// import { supabase } from '../../lib/supabaseClient';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { score } = req.body;

//   const { data, error } = await supabase
//     .from('scores')
//     .insert({ score });

//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }
//   // ...
// }