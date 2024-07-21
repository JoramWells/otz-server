import pandas as pd
from datetime import datetime

# df = pd.read_csv('./datasets/patientLinelist.csv', na_values='Missing')

adult_age_cutoff = 18

# calculate age
def calculate_age(dob):
    today = datetime.today()
    dob = pd.to_datetime(dob, errors='coerce')
    if pd.isnull(dob):
        return None
    return today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day) )

def preprocessCSV(df):
    # filter data
    df['age'] = df['DOB'].apply(calculate_age)

    adults = df[df['age'] >= adult_age_cutoff]
    paed = df[df['age'] < adult_age_cutoff]

    regimen_lines =  ['First line', 'Second line', 'Third line']
    gender_groups = ['M', 'F']

    results = {
        'adults':{line:{gender:{'count':0, 'regimens':{}} for gender in gender_groups} for line in regimen_lines},
        'paeds':{line:{gender:{'count':0, 'regimens':{}} for gender in gender_groups} for line in regimen_lines}
    }

    for line in regimen_lines:
            for gender in gender_groups:
                adult_filtered = adults[(adults['Current Regimen Line'] == line) & (adults['Sex'] == gender)]
                paed_filtered = paed[(paed['Current Regimen Line'] == line) & (paed['Sex'] == gender)]
                results['adults'][line][gender]['count'] = adult_filtered.shape[0]
                for regimen in adult_filtered['Current Regimen'].unique():
                    
                    regimen_count = adult_filtered[adult_filtered['Current Regimen']==regimen].shape[0]
                    results['adults'][line][gender]['regimens'][regimen] = regimen_count
                
                for regimen in paed_filtered['Current Regimen'].unique():
                    regimen_count = paed_filtered[paed_filtered['Current Regimen'] == regimen].shape[0]
                    results['paeds'][line][gender]['regimens'][regimen] = regimen_count
                # print(adult_filtered)

    table_data = {
        "Adults":{
            "Male":{line:{"count": results['adults'][line]['M']['count'], 'regimens':results['adults'][line]['M']['regimens']} for line in regimen_lines },
            "Female":{line:{"count": results['adults'][line]['F']['count'], 'regimens':results['adults'][line]['F']['regimens']} for line in regimen_lines },
        },
        "Pediatrics":{
        "Male":{line:{"count": results['paeds'][line]['M']['count'], 'regimens':results['paeds'][line]['M']['regimens']} for line in regimen_lines },
        "Female":{line:{"count": results['paeds'][line]['F']['count'], 'regimens':results['paeds'][line]['F']['regimens']} for line in regimen_lines },
        }
    }

    csv_data = []
    for age_group in table_data.keys():
        for gender in table_data[age_group].keys():
            for line in table_data[age_group][gender].keys():
                regimens = table_data[age_group][gender][line]['regimens']
                for regimen, count in regimens.items():
                    csv_data.append([age_group, gender, line, regimen, count])



    csv_df = pd.DataFrame(csv_data, columns=['Age Group', 'Gender', 'Regimen Line', 'Regimen', 'Count'])
    csv_df.to_csv('./regimen_count.csv', index=False)

    return csv_df

    print(csv_df)

