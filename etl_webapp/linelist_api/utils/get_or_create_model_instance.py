from django.db import models

def get_or_create_model_instance(model:models.Model, create_defaults: dict=None, **filter_kwargs):
    try:
        instance_list = model.objects.filter(**filter_kwargs)
        if (instance_list.exists()):
            if instance_list.count() > 1:
                return instance_list.first(), False

        create_data = {**filter_kwargs, **(create_defaults or {})}
        instance = model.objects.create(**create_data)
        return instance, True
    except Exception as e:
        print(f"An error occurred: {e} ")