// Generic medicines data with images and doses
const genericMedicines = [
    { name: "Amoxicillin", dose: "500mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Amoxicillin+500mg" },
    { name: "Ciprofloxacin", dose: "250mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Ciprofloxacin+250mg" },
    { name: "Azithromycin", dose: "500mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Azithromycin+500mg" },
    { name: "Metronidazole", dose: "400mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Metronidazole+400mg" },
    { name: "Cephalexin", dose: "500mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Cephalexin+500mg" },
    { name: "Doxycycline", dose: "100mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Doxycycline+100mg" },
    { name: "Ibuprofen", dose: "200mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Ibuprofen+200mg" },
    { name: "Paracetamol", dose: "500mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Paracetamol+500mg" },
    { name: "Aspirin", dose: "75mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Aspirin+75mg" },
    { name: "Omeprazole", dose: "20mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Omeprazole+20mg" },
    { name: "Metformin", dose: "500mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Metformin+500mg" },
    { name: "Amlodipine", dose: "5mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Amlodipine+5mg" },
    { name: "Losartan", dose: "50mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Losartan+50mg" },
    { name: "Simvastatin", dose: "20mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Simvastatin+20mg" },
    { name: "Atorvastatin", dose: "10mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Atorvastatin+10mg" },
    { name: "Furosemide", dose: "40mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Furosemide+40mg" },
    { name: "Hydrochlorothiazide", dose: "25mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=HCTZ+25mg" },
    { name: "Warfarin", dose: "5mg", image: "https://via.placeholder.com/150x150/9E9E9E/FFFFFF?text=Warfarin+5mg" },
    { name: "Clopidogrel", dose: "75mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Clopidogrel+75mg" },
    { name: "Digoxin", dose: "0.25mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Digoxin+0.25mg" },
    { name: "Atenolol", dose: "50mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Atenolol+50mg" },
    { name: "Propranolol", dose: "40mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Propranolol+40mg" },
    { name: "Metoprolol", dose: "50mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Metoprolol+50mg" },
    { name: "Prednisone", dose: "5mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Prednisone+5mg" },
    { name: "Albuterol", dose: "100mcg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Albuterol+100mcg" },
    { name: "Cetirizine", dose: "10mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Cetirizine+10mg" },
    { name: "Loratadine", dose: "10mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Loratadine+10mg" },
    { name: "Ranitidine", dose: "150mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Ranitidine+150mg" },
    { name: "Famotidine", dose: "20mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Famotidine+20mg" },
    { name: "Pantoprazole", dose: "40mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Pantoprazole+40mg" },
    { name: "Esomeprazole", dose: "20mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Esomeprazole+20mg" },
    { name: "Lansoprazole", dose: "30mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Lansoprazole+30mg" },
    { name: "Ondansetron", dose: "4mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Ondansetron+4mg" },
    { name: "Loperamide", dose: "2mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Loperamide+2mg" },
    { name: "Diphenhydramine", dose: "25mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Diphenhydramine+25mg" },
    { name: "Gabapentin", dose: "300mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Gabapentin+300mg" },
    { name: "Pregabalin", dose: "75mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Pregabalin+75mg" },
    { name: "Sertraline", dose: "50mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Sertraline+50mg" },
    { name: "Fluoxetine", dose: "20mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Fluoxetine+20mg" },
    { name: "Escitalopram", dose: "10mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Escitalopram+10mg" },
    { name: "Venlafaxine", dose: "37.5mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Venlafaxine+37.5mg" },
    { name: "Duloxetine", dose: "30mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Duloxetine+30mg" },
    { name: "Bupropion", dose: "150mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Bupropion+150mg" },
    { name: "Amitriptyline", dose: "25mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Amitriptyline+25mg" },
    { name: "Diazepam", dose: "5mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Diazepam+5mg" },
    { name: "Lorazepam", dose: "1mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Lorazepam+1mg" },
    { name: "Alprazolam", dose: "0.5mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Alprazolam+0.5mg" },
    { name: "Zolpidem", dose: "10mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Zolpidem+10mg" },
    { name: "Trazodone", dose: "50mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Trazodone+50mg" },
    { name: "Mirtazapine", dose: "15mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Mirtazapine+15mg" },
    { name: "Buspirone", dose: "10mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Buspirone+10mg" },
    { name: "Hydroxyzine", dose: "25mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Hydroxyzine+25mg" },
    { name: "Quetiapine", dose: "25mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Quetiapine+25mg" },
    { name: "Olanzapine", dose: "5mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Olanzapine+5mg" },
    { name: "Risperidone", dose: "1mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Risperidone+1mg" },
    { name: "Lithium", dose: "300mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Lithium+300mg" },
    { name: "Valproic Acid", dose: "250mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Valproic+Acid+250mg" },
    { name: "Carbamazepine", dose: "200mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Carbamazepine+200mg" },
    { name: "Lamotrigine", dose: "25mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Lamotrigine+25mg" },
    { name: "Levetiracetam", dose: "500mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Levetiracetam+500mg" },
    { name: "Topiramate", dose: "25mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Topiramate+25mg" },
    { name: "Baclofen", dose: "10mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Baclofen+10mg" },
    { name: "Tizanidine", dose: "4mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Tizanidine+4mg" },
    { name: "Cyclobenzaprine", dose: "10mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Cyclobenzaprine+10mg" },
    { name: "Methocarbamol", dose: "500mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Methocarbamol+500mg" },
    { name: "Rasagiline", dose: "1mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Rasagiline+1mg" },
    { name: "Selegiline", dose: "5mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Selegiline+5mg" },
    { name: "Entacapone", dose: "200mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Entacapone+200mg" },
    { name: "Pramipexole", dose: "0.25mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Pramipexole+0.25mg" },
    { name: "Ropinirole", dose: "0.25mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Ropinirole+0.25mg" },
    { name: "Levodopa", dose: "100mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Levodopa+100mg" },
    { name: "Carbidopa", dose: "25mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Carbidopa+25mg" },
    { name: "Amantadine", dose: "100mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Amantadine+100mg" },
    { name: "Naltrexone", dose: "50mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Naltrexone+50mg" },
    { name: "Buprenorphine", dose: "8mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Buprenorphine+8mg" },
    { name: "Methadone", dose: "10mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Methadone+10mg" },
    { name: "Disulfiram", dose: "500mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Disulfiram+500mg" },
    { name: "Acamprosate", dose: "333mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Acamprosate+333mg" },
    { name: "Naloxone", dose: "0.4mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Naloxone+0.4mg" },
    { name: "Clonidine", dose: "0.1mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Clonidine+0.1mg" },
    { name: "Guanfacine", dose: "1mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Guanfacine+1mg" },
    { name: "Prazosin", dose: "1mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Prazosin+1mg" },
    { name: "Terazosin", dose: "1mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Terazosin+1mg" },
    { name: "Doxazosin", dose: "1mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Doxazosin+1mg" },
    { name: "Tamsulosin", dose: "0.4mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Tamsulosin+0.4mg" },
    { name: "Alfuzosin", dose: "10mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Alfuzosin+10mg" },
    { name: "Silodosin", dose: "8mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Silodosin+8mg" },
    { name: "Finasteride", dose: "5mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Finasteride+5mg" },
    { name: "Dutasteride", dose: "0.5mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Dutasteride+0.5mg" },
    { name: "Minoxidil", dose: "5mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Minoxidil+5mg" },
    { name: "Spironolactone", dose: "25mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Spironolactone+25mg" },
    { name: "Amiloride", dose: "5mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Amiloride+5mg" },
    { name: "Triamterene", dose: "50mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Triamterene+50mg" },
    { name: "Eplerenone", dose: "25mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Eplerenone+25mg" },
    { name: "Ethinyl Estradiol", dose: "0.035mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Ethinyl+Estradiol+0.035mg" },
    { name: "Levonorgestrel", dose: "0.15mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Levonorgestrel+0.15mg" },
    { name: "Medroxyprogesterone", dose: "10mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Medroxyprogesterone+10mg" },
    { name: "Testosterone", dose: "50mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Testosterone+50mg" },
    { name: "Fluoxetine", dose: "10mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Fluoxetine+10mg" },
    { name: "Sertraline", dose: "25mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Sertraline+25mg" },
    { name: "Paroxetine", dose: "10mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Paroxetine+10mg" },
    { name: "Citalopram", dose: "10mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Citalopram+10mg" },
    { name: "Bupropion", dose: "75mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Bupropion+75mg" },
    { name: "Venlafaxine", dose: "25mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Venlafaxine+25mg" },
    { name: "Duloxetine", dose: "20mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Duloxetine+20mg" },
    { name: "Mirtazapine", dose: "7.5mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Mirtazapine+7.5mg" },
    { name: "Trazodone", dose: "25mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Trazodone+25mg" },
    { name: "Buspirone", dose: "5mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Buspirone+5mg" },
    { name: "Hydroxyzine", dose: "10mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Hydroxyzine+10mg" },
    { name: "Chlorpromazine", dose: "25mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Chlorpromazine+25mg" },
    { name: "Haloperidol", dose: "1mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Haloperidol+1mg" },
    { name: "Risperidone", dose: "0.5mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Risperidone+0.5mg" },
    { name: "Olanzapine", dose: "2.5mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Olanzapine+2.5mg" },
    { name: "Quetiapine", dose: "12.5mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Quetiapine+12.5mg" },
    { name: "Aripiprazole", dose: "2mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Aripiprazole+2mg" },
    { name: "Ziprasidone", dose: "20mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Ziprasidone+20mg" },
    { name: "Paliperidone", dose: "3mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Paliperidone+3mg" },
    { name: "Lurasidone", dose: "20mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Lurasidone+20mg" },
    { name: "Cariprazine", dose: "1.5mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Cariprazine+1.5mg" },
    { name: "Brexpiprazole", dose: "0.5mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Brexpiprazole+0.5mg" },
    { name: "Clozapine", dose: "12.5mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Clozapine+12.5mg" },
    { name: "Lithium Carbonate", dose: "150mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Lithium+Carbonate+150mg" },
    { name: "Valproic Acid", dose: "125mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Valproic+Acid+125mg" },
    { name: "Lamotrigine", dose: "12.5mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Lamotrigine+12.5mg" },
    { name: "Oxcarbazepine", dose: "150mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Oxcarbazepine+150mg" },
    { name: "Topiramate", dose: "12.5mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Topiramate+12.5mg" },
    { name: "Zonisamide", dose: "25mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Zonisamide+25mg" },
    { name: "Lacosamide", dose: "50mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Lacosamide+50mg" },
    { name: "Perampanel", dose: "2mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Perampanel+2mg" },
    { name: "Eslicarbazepine", dose: "200mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Eslicarbazepine+200mg" },
    { name: "Brivaracetam", dose: "10mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Brivaracetam+10mg" },
    { name: "Cenobamate", dose: "12.5mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Cenobamate+12.5mg" },
    { name: "Felbamate", dose: "400mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Felbamate+400mg" },
    { name: "Rufinamide", dose: "200mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Rufinamide+200mg" },
    { name: "Stiripentol", dose: "250mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Stiripentol+250mg" },
    { name: "Vigabatrin", dose: "500mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Vigabatrin+500mg" },
    { name: "Tiagabine", dose: "4mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Tiagabine+4mg" },
    { name: "Pregabalin", dose: "25mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Pregabalin+25mg" },
    { name: "Gabapentin", dose: "100mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Gabapentin+100mg" },
    { name: "Baclofen", dose: "5mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Baclofen+5mg" },
    { name: "Tizanidine", dose: "2mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Tizanidine+2mg" },
    { name: "Cyclobenzaprine", dose: "5mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Cyclobenzaprine+5mg" },
    { name: "Methocarbamol", dose: "250mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Methocarbamol+250mg" },
    { name: "Orphenadrine", dose: "100mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Orphenadrine+100mg" },
    { name: "Chlorzoxazone", dose: "250mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Chlorzoxazone+250mg" },
    { name: "Metaxalone", dose: "400mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Metaxalone+400mg" },
    { name: "Dantrolene", dose: "25mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Dantrolene+25mg" },
    { name: "Botulinum Toxin", dose: "100 units", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Botulinum+Toxin+100u" },
    { name: "Riluzole", dose: "50mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Riluzole+50mg" },
    { name: "Edaravone", dose: "30mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Edaravone+30mg" },
    { name: "Rasagiline", dose: "0.5mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Rasagiline+0.5mg" },
    { name: "Selegiline", dose: "2.5mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Selegiline+2.5mg" },
    { name: "Entacapone", dose: "100mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Entacapone+100mg" },
    { name: "Tolcapone", dose: "100mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Tolcapone+100mg" },
    { name: "Safinamide", dose: "50mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Safinamide+50mg" },
    { name: "Opicapone", dose: "25mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Opicapone+25mg" },
    { name: "Istradefylline", dose: "20mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Istradefylline+20mg" },
    { name: "Apomorphine", dose: "2mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Apomorphine+2mg" },
    { name: "Rotigotine", dose: "2mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Rotigotine+2mg" },
    { name: "Levodopa", dose: "50mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Levodopa+50mg" },
    { name: "Carbidopa", dose: "12.5mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Carbidopa+12.5mg" },
    { name: "Benserazide", dose: "12.5mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Benserazide+12.5mg" },
    { name: "Amantadine", dose: "50mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Amantadine+50mg" },
    { name: "Naltrexone", dose: "25mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Naltrexone+25mg" },
    { name: "Buprenorphine", dose: "4mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Buprenorphine+4mg" },
    { name: "Methadone", dose: "5mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Methadone+5mg" },
    { name: "Disulfiram", dose: "250mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Disulfiram+250mg" },
    { name: "Acamprosate", dose: "166mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Acamprosate+166mg" },
    { name: "Naloxone", dose: "0.2mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Naloxone+0.2mg" },
    { name: "Clonidine", dose: "0.05mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Clonidine+0.05mg" },
    { name: "Guanfacine", dose: "0.5mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Guanfacine+0.5mg" },
    { name: "Prazosin", dose: "0.5mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Prazosin+0.5mg" },
    { name: "Terazosin", dose: "0.5mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Terazosin+0.5mg" },
    { name: "Doxazosin", dose: "0.5mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Doxazosin+0.5mg" },
    { name: "Tamsulosin", dose: "0.2mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Tamsulosin+0.2mg" },
    { name: "Alfuzosin", dose: "5mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Alfuzosin+5mg" },
    { name: "Silodosin", dose: "4mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Silodosin+4mg" },
    { name: "Finasteride", dose: "2.5mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Finasteride+2.5mg" },
    { name: "Dutasteride", dose: "0.25mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Dutasteride+0.25mg" },
    { name: "Minoxidil", dose: "2.5mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Minoxidil+2.5mg" },
    { name: "Spironolactone", dose: "12.5mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Spironolactone+12.5mg" },
    { name: "Amiloride", dose: "2.5mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Amiloride+2.5mg" },
    { name: "Triamterene", dose: "25mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Triamterene+25mg" },
    { name: "Eplerenone", dose: "12.5mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Eplerenone+12.5mg" },
    { name: "Ethinyl Estradiol", dose: "0.02mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Ethinyl+Estradiol+0.02mg" },
    { name: "Levonorgestrel", dose: "0.1mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Levonorgestrel+0.1mg" },
    { name: "Norethindrone", dose: "0.35mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Norethindrone+0.35mg" },
    { name: "Medroxyprogesterone", dose: "5mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Medroxyprogesterone+5mg" },
    { name: "Progesterone", dose: "100mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Progesterone+100mg" },
    { name: "Testosterone", dose: "25mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Testosterone+25mg" },
    { name: "Methyltestosterone", dose: "10mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Methyltestosterone+10mg" },
    { name: "Fluoxymesterone", dose: "5mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Fluoxymesterone+5mg" },
    { name: "Oxandrolone", dose: "2.5mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Oxandrolone+2.5mg" },
    { name: "Stanozolol", dose: "2mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Stanozolol+2mg" },
    { name: "Nandrolone", dose: "25mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Nandrolone+25mg" },
    { name: "Boldenone", dose: "25mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Boldenone+25mg" },
    { name: "Trenbolone", dose: "25mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Trenbolone+25mg" },
    { name: "Methenolone", dose: "25mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Methenolone+25mg" },
    { name: "Oxymetholone", dose: "25mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Oxymetholone+25mg" },
    { name: "Anavar", dose: "10mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Anavar+10mg" },
    { name: "Winstrol", dose: "10mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Winstrol+10mg" },
    { name: "Deca-Durabolin", dose: "25mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Deca-Durabolin+25mg" },
    { name: "Sustanon", dose: "25mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Sustanon+25mg" },
    { name: "Testosterone Enanthate", dose: "25mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Testosterone+Enanthate+25mg" },
    { name: "Testosterone Cypionate", dose: "25mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Testosterone+Cypionate+25mg" },
    { name: "Testosterone Propionate", dose: "25mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Testosterone+Propionate+25mg" },
    { name: "Testosterone Undecanoate", dose: "40mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Testosterone+Undecanoate+40mg" },
    { name: "Dianabol", dose: "5mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Dianabol+5mg" },
    { name: "Anadrol", dose: "25mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Anadrol+25mg" },
    { name: "Halotestin", dose: "5mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Halotestin+5mg" },
    { name: "Provviron", dose: "25mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Provviron+25mg" },
    { name: "Arimidex", dose: "0.5mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Arimidex+0.5mg" },
    { name: "Nolvadex", dose: "10mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Nolvadex+10mg" },
    { name: "Clomid", dose: "25mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Clomid+25mg" },
    { name: "HCG", dose: "500IU", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=HCG+500IU" },
    { name: "HMG", dose: "75IU", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=HMG+75IU" },
    { name: "Gonadorelin", dose: "100mcg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Gonadorelin+100mcg" },
    { name: "Sermorelin", dose: "200mcg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Sermorelin+200mcg" },
    { name: "Ipamorelin", dose: "200mcg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Ipamorelin+200mcg" },
    { name: "CJC-1295", dose: "100mcg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=CJC-1295+100mcg" },
    { name: "Tesamorelin", dose: "1mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Tesamorelin+1mg" },
    { name: "AOD-9604", dose: "500mcg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=AOD-9604+500mcg" },
    { name: "CPC-157", dose: "250mcg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=CPC-157+250mcg" },
    { name: "TB-500", dose: "2mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=TB-500+2mg" },
    { name: "BPC-157", dose: "250mcg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=BPC-157+250mcg" },
    { name: "Epithalamin", dose: "10mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Epithalamin+10mg" },
    { name: "Epitalon", dose: "10mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Epitalon+10mg" },
    { name: "Selank", dose: "3mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Selank+3mg" },
    { name: "Semax", dose: "3mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Semax+3mg" },
    { name: "Noopept", dose: "10mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Noopept+10mg" },
    { name: "Aniracetam", dose: "750mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Aniracetam+750mg" },
    { name: "Piracetam", dose: "800mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Piracetam+800mg" },
    { name: "Oxiracetam", dose: "800mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Oxiracetam+800mg" },
    { name: "Pramiracetam", dose: "300mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Pramiracetam+300mg" },
    { name: "Phenylpiracetam", dose: "100mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Phenylpiracetam+100mg" },
    { name: "Coluracetam", dose: "20mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Coluracetam+20mg" },
    { name: "Fasoracetam", dose: "100mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Fasoracetam+100mg" },
    { name: "Sunifiram", dose: "10mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Sunifiram+10mg" },
    { name: "Unifiram", dose: "5mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Unifiram+5mg" },
    { name: "Hydrafinil", dose: "50mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Hydrafinil+50mg" },
    { name: "CRL-40,941", dose: "10mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=CRL-40,941+10mg" },
    { name: "Modafinil", dose: "100mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Modafinil+100mg" },
    { name: "Armodafinil", dose: "150mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Armodafinil+150mg" },
    { name: "Adrafinil", dose: "300mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Adrafinil+300mg" },
    { name: "Fladrafinil", dose: "30mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Fladrafinil+30mg" },
    { name: "Ritalin", dose: "10mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Ritalin+10mg" },
    { name: "Concerta", dose: "18mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Concerta+18mg" },
    { name: "Focalin", dose: "5mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Focalin+5mg" },
    { name: "Vyvanse", dose: "30mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Vyvanse+30mg" },
    { name: "Elvanse", dose: "30mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Elvanse+30mg" },
    { name: "Lisdexamfetamine", dose: "30mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Lisdexamfetamine+30mg" },
    { name: "Adderall", dose: "10mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Adderall+10mg" },
    { name: "Dexedrine", dose: "5mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Dexedrine+5mg" },
    { name: "Dexamfetamine", dose: "5mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Dexamfetamine+5mg" },
    { name: "Desoxyn", dose: "5mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Desoxyn+5mg" },
    { name: "Provigil", dose: "100mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Provigil+100mg" },
    { name: "Nuvigil", dose: "150mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Nuvigil+150mg" },
    { name: "Sparlon", dose: "100mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Sparlon+100mg" },
    { name: "Alphamox", dose: "250mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Alphamox+250mg" },
    { name: "Moxdostin", dose: "250mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Moxdostin+250mg" },
    { name: "Rubifen", dose: "10mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Rubifen+10mg" },
    { name: "Dexmethylphenidate", dose: "5mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Dexmethylphenidate+5mg" },
    { name: "Tenofovir", dose: "300mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Tenofovir+300mg" },
    { name: "Alafenamide", dose: "25mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Alafenamide+25mg" },
    { name: "Bictegravir", dose: "50mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Bictegravir+50mg" },
    { name: "Emtricitabine", dose: "200mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Emtricitabine+200mg" },
    { name: "Dolutegravir", dose: "50mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Dolutegravir+50mg" },
    { name: "Abacavir", dose: "300mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Abacavir+300mg" },
    { name: "Lamivudine", dose: "150mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Lamivudine+150mg" },
    { name: "Efavirenz", dose: "600mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Efavirenz+600mg" },
    { name: "Rilpivirine", dose: "25mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Rilpivirine+25mg" },
    { name: "Doravirine", dose: "100mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Doravirine+100mg" },
    { name: "Indinavir", dose: "400mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Indinavir+400mg" },
    { name: "Ritonavir", dose: "100mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Ritonavir+100mg" },
    { name: "Lopinavir", dose: "200mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Lopinavir+200mg" },
    { name: "Nelfinavir", dose: "625mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Nelfinavir+625mg" },
    { name: "Saquinavir", dose: "500mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Saquinavir+500mg" },
    { name: "Darunavir", dose: "600mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Darunavir+600mg" },
    { name: "Atazanavir", dose: "300mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Atazanavir+300mg" },
    { name: "Fosamprenavir", dose: "700mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Fosamprenavir+700mg" },
    { name: "Tipranavir", dose: "250mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Tipranavir+250mg" },
    { name: "Raltegravir", dose: "400mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Raltegravir+400mg" },
    { name: "Dolutegravir", dose: "50mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Dolutegravir+50mg" },
    { name: "Bictegravir", dose: "50mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Bictegravir+50mg" },
    { name: "Cabotegravir", dose: "30mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Cabotegravir+30mg" },
    { name: "Enfuvirtide", dose: "90mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Enfuvirtide+90mg" },
    { name: "Maraviroc", dose: "150mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Maraviroc+150mg" },
    { name: "Ibalizumab", dose: "800mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Ibalizumab+800mg" },
    { name: "Fostemsavir", dose: "600mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Fostemsavir+600mg" },
    { name: "Zidovudine", dose: "300mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Zidovudine+300mg" },
    { name: "Didanosine", dose: "400mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Didanosine+400mg" },
    { name: "Zalcitabine", dose: "0.75mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Zalcitabine+0.75mg" },
    { name: "Stavudine", dose: "40mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Stavudine+40mg" },
    { name: "Lamivudine", dose: "150mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Lamivudine+150mg" },
    { name: "Emtricitabine", dose: "200mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Emtricitabine+200mg" },
    { name: "Abacavir", dose: "300mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Abacavir+300mg" },
    { name: "Tenofovir", dose: "300mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Tenofovir+300mg" },
    { name: "Alafenamide", dose: "25mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Alafenamide+25mg" },
    { name: "Entecavir", dose: "0.5mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Entecavir+0.5mg" },
    { name: "Adefovir", dose: "10mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Adefovir+10mg" },
    { name: "Dipivoxil", dose: "10mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Dipivoxil+10mg" },
    { name: "Telbivudine", dose: "600mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Telbivudine+600mg" },
    { name: "Interferon Alfa", dose: "3MIU", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Interferon+Alfa+3MIU" },
    { name: "Peginterferon Alfa", dose: "180mcg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Peginterferon+Alfa+180mcg" },
    { name: "Ribavirin", dose: "200mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Ribavirin+200mg" },
    { name: "Simeprevir", dose: "150mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Simeprevir+150mg" },
    { name: "Sofosbuvir", dose: "400mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Sofosbuvir+400mg" },
    { name: "Ledipasvir", dose: "90mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Ledipasvir+90mg" },
    { name: "Velpatasvir", dose: "100mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Velpatasvir+100mg" },
    { name: "Voxilaprevir", dose: "100mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Voxilaprevir+100mg" },
    { name: "Glecaprevir", dose: "100mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Glecaprevir+100mg" },
    { name: "Pibrentasvir", dose: "40mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Pibrentasvir+40mg" },
    { name: "Daclatasvir", dose: "60mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Daclatasvir+60mg" },
    { name: "Asunaprevir", dose: "100mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Asunaprevir+100mg" },
    { name: "Beclabuvir", dose: "75mg", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Beclabuvir+75mg" },
    { name: "Oseltamivir", dose: "75mg", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Oseltamivir+75mg" },
    { name: "Zanamivir", dose: "10mg", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Zanamivir+10mg" },
    { name: "Peramivir", dose: "600mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Peramivir+600mg" },
    { name: "Baloxavir", dose: "40mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Baloxavir+40mg" },
    { name: "Marboxil", dose: "40mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Marboxil+40mg" },
    { name: "Amantadine", dose: "100mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Amantadine+100mg" },
    { name: "Rimantadine", dose: "100mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Rimantadine+100mg" },
    { name: "Acyclovir", dose: "400mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Acyclovir+400mg" },
    { name: "Valacyclovir", dose: "500mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Valacyclovir+500mg" },
    { name: "Famciclovir", dose: "250mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Famciclovir+250mg" },
    { name: "Penciclovir", dose: "1%", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Penciclovir+1%" },
    { name: "Ganciclovir", dose: "500mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Ganciclovir+500mg" },
    { name: "Valganciclovir", dose: "450mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Valganciclovir+450mg" },
    { name: "Cidofovir", dose: "375mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Cidofovir+375mg" },
    { name: "Foscarnet", dose: "60mg", image: "https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Foscarnet+60mg" },
    { name: "Trifluridine", dose: "1%", image: "https://via.placeholder.com/150x150/CDDC39/FFFFFF?text=Trifluridine+1%" },
    { name: "Idoxuridine", dose: "0.1%", image: "https://via.placeholder.com/150x150/FFC107/FFFFFF?text=Idoxuridine+0.1%" },
    { name: "Vidarabine", dose: "3%", image: "https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Vidarabine+3%" },
    { name: "Ribavirin", dose: "200mg", image: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=Ribavirin+200mg" },
    { name: "Saxagliptin", dose: "5mg", image: "https://via.placeholder.com/150x150/03A9F4/FFFFFF?text=Saxagliptin+5mg" },
    { name: "Linagliptin", dose: "5mg", image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Linagliptin+5mg" },
    { name: "Alogliptin", dose: "25mg", image: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Alogliptin+25mg" },
    { name: "Vildagliptin", dose: "50mg", image: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Vildagliptin+50mg" },
    { name: "Sitagliptin", dose: "100mg", image: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Sitagliptin+100mg" },
    { name: "Gemigliptin", dose: "50mg", image: "https://via.placeholder.com/150x150/3F51B5/FFFFFF?text=Gemigliptin+50mg" },
    { name: "Anagliptin", dose: "100mg", image: "https://via.placeholder.com/150x150/009688/FFFFFF?text=Anagliptin+100mg" },
    { name: "Teneligliptin", dose: "20mg", image: "https://via.placeholder.com/150x150/F44336/FFFFFF?text=Teneligliptin+20mg" },
    { name: "Trelagliptin", dose: "100mg", image: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Trelagliptin+100mg" },
    { name: "Gosogliptin", dose: "25mg", image: "https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Gosogliptin+25mg" },
    { name: "Dutogliptin", dose: "100mg", image: "https://via.placeholder.com/150x150/795548/FFFFFF?text=Dutogliptin+100mg" }
];

// Generate all generics with prices
const allGenerics = [];
genericMedicines.forEach(med => {
    allGenerics.push({
        name: med.name,
        dose: med.dose,
        image: med.image,
        price: (Math.random() * 20 + 1).toFixed(2)
    });
});

// DOM elements
const searchInput = document.getElementById('genericSearch');
const genericsGrid = document.getElementById('genericsGrid');
const cartCount = document.getElementById('cart-count');

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

// Render generics
function renderGenerics(genericsToShow) {
    genericsGrid.innerHTML = '';
    genericsToShow.forEach(generic => {
        const imageUrl = generic.image || `https://via.placeholder.com/120x120/cccccc/333333?text=${encodeURIComponent(generic.name)}`;
        const card = document.createElement('div');
        card.className = 'generic-card';
        card.innerHTML = `
            <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/120x120/cccccc/333333?text=No+Image';" alt="${generic.name}" class="generic-image">
            <div class="generic-details">
                <h3>${generic.name}</h3>
                <div class="generic-dose">Dose: ${generic.dose}</div>
                <div class="generic-price">$${generic.price}</div>
            </div>
            <button class="add-to-cart-btn" data-name="${generic.name}" data-price="${generic.price}">Add to Cart</button>
        `;
        genericsGrid.appendChild(card);
    });
}

// Initial render - show nothing initially, only on search
renderGenerics([]);

// Search functionality
function performGenericSearch() {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = allGenerics.filter(gen => gen.name.toLowerCase().includes(query));
    renderGenerics(filtered);
}

searchInput.addEventListener('input', performGenericSearch);

const genericSearchBtn = document.getElementById('searchBtn');
if (genericSearchBtn) {
    genericSearchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        performGenericSearch();
    });
}

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        performGenericSearch();
    }
});

// Add to cart
genericsGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const name = e.target.dataset.name;
        const price = parseFloat(e.target.dataset.price);
        addToCart(name, price);
        alert(`${name} added to cart!`);
    }
});

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    if (cartCount) {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = total;
    }
}

// Talk button
const talkButton = document.getElementById('talkButton');
if (talkButton) {
    talkButton.addEventListener('click', () => {
        alert('Thank you for reaching out! Our team will contact you soon.');
    });
}

// Hamburger menu (same as index)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}