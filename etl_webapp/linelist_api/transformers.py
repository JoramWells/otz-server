# from langchain import PromptTemplate, LLMChain,HuggingFaceHub, LlamaCpp
from langchain.llms import LlamaCpp
from langchain.prompts import PromptTemplate
model_name = './llm/mistral-7b-openorca.gguf2.Q4_0.gguf'

prompt_template = PromptTemplate.from_template("""
                                               Compose a good message to customer  using swahili language
Hello {customer}
""")

llm = LlamaCpp(
    model_path=model_name,
    # n_ctx=4096,
    # n_gpu_layers=32,
    # n_batch=1024,
    # f16_kv=True,
    # verbose=False
)

prompt = prompt_template.format(
    customer='jay'
)

import sys

# while True:
# question = input("Ask me a question: ")
# if question == "stop":
#     sys.exit()
output = llm(
    prompt
)
print(output)

