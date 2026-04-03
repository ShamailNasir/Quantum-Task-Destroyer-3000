import asyncio
import time
from services.ai_service import ai_service

async def test_speed(model_name: str, mode: str):
    prompt = ai_service._build_prompt(
        {"tasks":[{"title":"Solve Leetcode","type":"daily","category":"Study"}], "stats":{"dailyTotal": 5, "dailyDone": 1}}, 
        mode
    )
    
    start_time = time.time()
    try:
        content = await ai_service._call_openrouter(model_name, prompt)
        end_time = time.time()
        duration = end_time - start_time
        print(f"[{mode.upper()}] {model_name}: {duration:.2f} seconds")
        excerpt = content.replace('\\n', ' ')
        print(f"   Excerpt: {excerpt[:80]}...\\n")
    except Exception as e:
        end_time = time.time()
        duration = end_time - start_time
        print(f"[{mode.upper()}] {model_name}: FAILED after {duration:.2f} seconds. Error: {e}")

async def main():
    print("--- FAST SYSTEM MODELS ---")
    await test_speed("stepfun/step-3.5-flash:free", "fast")
    await asyncio.sleep(5)
    await test_speed("mistralai/mistral-small-3.1-24b-instruct:free", "fast")
    
    await asyncio.sleep(5)
    print("--- DEEP SYSTEM MODELS ---")
    await test_speed("nvidia/nemotron-3-super-120b-a12b:free", "deep")
    await asyncio.sleep(5)
    await test_speed("openai/gpt-oss-20b:free", "deep")

if __name__ == "__main__":
    asyncio.run(main())
