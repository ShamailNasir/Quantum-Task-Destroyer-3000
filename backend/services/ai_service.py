import httpx
from config.settings import settings

class AIService:
    def __init__(self):
        self.api_key = settings.OPENROUTER_API_KEY
        self.base_url = "https://openrouter.ai/api/v1/chat/completions"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "Quantum Task Destroyer 3000"
        }
        
        self.fast_primary = "stepfun/step-3.5-flash:free"
        self.fast_fallback = "mistralai/mistral-small-3.1-24b-instruct:free"
        self.deep_primary = "nvidia/nemotron-3-super-120b-a12b:free"
        self.deep_fallback = "openai/gpt-oss-20b:free"

    async def _call_openrouter(self, model: str, prompt: str, system_prompt: str = "") -> str:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        async with httpx.AsyncClient(timeout=25.0) as client:
            try:
                response = await client.post(
                    self.base_url,
                    headers=self.headers,
                    json={"model": model, "messages": messages, "temperature": 0.5}
                )
                response.raise_for_status()
                data = response.json()
                return data["choices"][0]["message"]["content"]
            except Exception as e:
                print(f"OpenRouter Error on {model}: {e}")
                raise

    async def _run_fast(self, prompt: str, system_prompt: str = "") -> str:
        try:
            return await self._call_openrouter(self.fast_primary, prompt, system_prompt)
        except Exception as e:
            print(f"Primary Fast Failed. Trying fallback: {e}")
            try:
                return await self._call_openrouter(self.fast_fallback, prompt, system_prompt)
            except Exception as ex:
                print(f"Fallback Fast Failed: {ex}")
                return ""

    async def _run_deep(self, prompt: str, system_prompt: str = "") -> str:
        try:
            return await self._call_openrouter(self.deep_primary, prompt, system_prompt)
        except Exception as e:
            print(f"Primary Deep Failed. Trying fallback: {e}")
            try:
                return await self._call_openrouter(self.deep_fallback, prompt, system_prompt)
            except Exception as ex:
                print(f"Fallback Deep Failed: {ex}")
                return ""

    def _summarize_tasks(self, tasks: list) -> str:
        if not tasks: return "No tasks currently registered."
        return "\\n".join(f"- {t.get('title')} ({t.get('type')}, {'Done' if t.get('completedDates') else 'Pending'})" for t in tasks)

    async def generate_future_message(self, data: dict) -> str:
        summary = self._summarize_tasks(data.get("tasks", []))
        sys_prompt = "You are the user's Future Self. Be emotionally intelligent and deeply motivational. Maximum 2 short sentences."
        prompt = f"Here is what I am working on right now:\\n{summary}\\nGive me a short message from my future self."
        res = await self._run_fast(prompt, sys_prompt)
        return res if res else "Keep pushing forward."

    async def enhance_task(self, title: str) -> str:
        sys_prompt = "Rewrite this task slightly to be more professional and clear. Return EXACTLY 1 short phrase. DO NOT add placeholders like [category] or [date]."
        res = await self._run_fast(f"Rewrite this seamlessly: {title}", sys_prompt)
        return res if res else title

    async def breakdown_task(self, title: str) -> str:
        sys_prompt = "Return exactly 3 highly specific, distinct bullet points. Always separate each item by pressing ENTER. Do not write them on a single line."
        res = await self._run_deep(f"Break down this task:\\n{title}", sys_prompt)
        if res:
            res = res.replace(" - ", "\\n- ").strip()
            return res
        return "- Network offline. Try again later."

    async def get_smart_suggestions(self, data: dict) -> str:
        summary = self._summarize_tasks(data.get("tasks", []))
        sys_prompt = "Suggest 1 logical next task based on the user's current list. Keep it extremely brief. Return ONLY the task title."
        prompt = f"Current tasks:\\n{summary}\\nSuggest what I should logically add next."
        return await self._run_fast(prompt, sys_prompt)

    async def get_quote(self) -> str:
        sys_prompt = "Provide a rare, powerful quote about discipline or productivity. Return ONLY the quote text natively. DO NOT include the author name. DO NOT include quotation marks or hyphens. Ensure perfect grammatical spacing."
        res = await self._run_fast("Give me a quote.", sys_prompt)
        return res if res else ""

    async def ask_help(self, query: str, data: dict, mode: str) -> str:
        summary = self._summarize_tasks(data.get("tasks", []))
        prompt = f"Context (My Tasks):\\n{summary}\\nMy question: {query}"
        sys_prompt = "You are an elite productivity coach. Be direct, practical, and highly concise."
        if mode == "fast":
            return await self._run_fast(prompt, sys_prompt)
        return await self._run_deep(prompt, sys_prompt)

ai_service = AIService()
