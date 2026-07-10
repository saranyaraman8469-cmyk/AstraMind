import operator
from typing import Annotated, TypedDict, List
from langgraph.graph import StateGraph, END
from langchain_core.messages import AnyMessage, SystemMessage, HumanMessage

class AgentState(TypedDict):
    messages: Annotated[List[AnyMessage], operator.add]
    task_type: str
    risk_level: str
    recommended_action: str

def route_task(state: AgentState) -> AgentState:
    # Logic to route the task to specialized agents based on user input or system triggers
    last_msg = state["messages"][-1].content.lower()
    task_type = "unknown"
    if "weather" in last_msg or "flood" in last_msg:
        task_type = "weather"
    elif "bridge" in last_msg or "road" in last_msg:
        task_type = "infrastructure"
    return {"task_type": task_type}

def specialized_agent_node(state: AgentState) -> AgentState:
    # This node would call the specific agent (e.g., WeatherAgent, InfraAgent)
    # Mocking the response for now
    task = state.get("task_type")
    msg = f"Specialized analysis completed for {task}."
    return {"messages": [SystemMessage(content=msg)]}

def decision_support_node(state: AgentState) -> AgentState:
    # Calls the risk predictor and decision support modules
    return {"risk_level": "HIGH", "recommended_action": "Evacuate area immediately."}

# Build the LangGraph
workflow = StateGraph(AgentState)

workflow.add_node("router", route_task)
workflow.add_node("specialized_agents", specialized_agent_node)
workflow.add_node("decision_support", decision_support_node)

workflow.set_entry_point("router")
workflow.add_edge("router", "specialized_agents")
workflow.add_edge("specialized_agents", "decision_support")
workflow.add_edge("decision_support", END)

chief_coordinator_app = workflow.compile()
