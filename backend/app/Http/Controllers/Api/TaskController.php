<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        $tasks = Task::where('user_id', $userId)->get();

        $tasksArray = TaskResource::collection($tasks)->response()->getData(true);

        return $tasksArray['data'];
    }

    public function store(StoreTaskRequest $request)
    {
        $validatedData = $request->validated();
        $userId = Auth::id();

        $task = Task::create(array_merge($validatedData, [
            'user_id' => $userId,
        ]));

        if (!$task) {
            return response()->json(["message" => "Не вдалося створити завдання {$validatedData['title']}"], 500);
        }

        return response()->json(
            [
                "message" => "завдання {$validatedData['title']} було створено",
                "data" => $task
            ],
            201
        );
    }

    public function show(Task $task)
    {

        $userId = Auth::id();
        if ($task->user_id !== $userId) {
            return response()->json(["message" => "Не вдалось знайти завдання"], 404);
        }

        return response()->json((new TaskResource($task))->toArray(request()));
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $userId = Auth::id();
        if ($task->user_id !== $userId) {
            return response()->json(["message" => "Не вдалось оновити завдання"], 404);
        }

        $validatedData = $request->validated();

        $task->update($validatedData);

        return response()->json((new TaskResource($task))->toArray(request()));
    }

    public function destroy(Task $task)
    {
        $userId = Auth::id();
        if ($task->user_id !== $userId) {
            return response()->json(["message" => "Не вдалось видалити завдання"], 404);
        }

        $task->delete();
        return response()->json(['message' => 'Завдання було успiшно  видалено'], 200);
    }
}
