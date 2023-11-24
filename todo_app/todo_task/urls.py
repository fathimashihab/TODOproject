# todo/urls.py
from django.urls import path
from .views import TaskListCreateView, TaskDetailView, update_task

urlpatterns = [
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('api/tasks/<int:task_id>/', update_task, name='update_task'),
]
