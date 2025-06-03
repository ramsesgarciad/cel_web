  // Calculando las fechas para el gráfico Gantt
  const calculateDates = () => {
    if (!tasks || tasks.length === 0) return { minDate: new Date(), maxDate: new Date(), totalDays: 30 };
    
    const startDates = tasks.map(task => new Date(task.start_date));
    const endDates = tasks.map(task => new Date(task.end_date));
    
    const minDate = new Date(Math.min(...startDates));
    const maxDate = new Date(Math.max(...endDates));
    
    // Calcular el total de días para el ancho del gráfico
    const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1;
    
    return { minDate, maxDate, totalDays };
  };
  
  const { minDate, maxDate, totalDays } = calculateDates();
  
  // Función para calcular la posición y ancho de cada tarea en el gráfico Gantt
  const calculateTaskPosition = (task) => {
    const taskStart = new Date(task.start_date);
    const taskEnd = new Date(task.end_date);
    
    const startOffset = Math.max(0, (taskStart - minDate) / (1000 * 60 * 60 * 24));
    const duration = Math.max(1, (taskEnd - taskStart) / (1000 * 60 * 60 * 24)) + 1;
    
    return {
      left: `${(startOffset / totalDays) * 100}%`,
      width: `${(duration / totalDays) * 100}%`
    };
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        {/* Encabezado */}
        <header className="bg-white shadow py-4 px-6 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <Image
              src="/img/logo.svg"
              alt="Caribbean Embedded Labs Logo"
              width={40}
              height={40}
            />
            <h1 className="text-xl font-semibold text-gray-800">Panel de Cliente</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.push('/profile')}
              className="text-gray-600 hover:text-gray-800"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </div>
                <span>{user.name || user.email}</span>
              </div>
            </button>
            <button 
              onClick={logout}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Cerrar Sesión
            </button>
          </div>
        </header>

        {/* Contenido principal con sidebar */}
        <div className="flex">
          {/* Sidebar con lista de proyectos */}
          <aside className={`bg-white shadow transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} min-h-[calc(100vh-4rem)] flex flex-col`}>
            <div className="py-4 px-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className={`font-semibold text-gray-800 ${sidebarOpen ? 'block' : 'hidden'}`}>Mis Proyectos</h2>
              <button 
                onClick={toggleSidebar}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
            </div>
            
            <div className="overflow-y-auto flex-1">
              <ul className="py-2">
                {projects.map((proj) => (
                  <li key={proj.id} className="px-3 py-2">
                    <button
                      onClick={() => setSelectedProjectId(proj.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedProjectId === proj.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          proj.progress >= 100 
                            ? 'bg-green-500' 
                            : proj.progress > 0 
                              ? 'bg-yellow-500' 
                              : 'bg-blue-500'
                        }`}></div>
                        {sidebarOpen ? (
                          <div>
                            <p className="font-medium truncate" style={{ maxWidth: '180px' }}>{proj.name}</p>
                            <p className="text-xs text-gray-500 truncate" style={{ maxWidth: '180px' }}>
                              {proj.progress}% completado
                            </p>
                          </div>
                        ) : (
                          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                            {proj.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Contenido principal */}
          <main className="flex-1 p-6 overflow-auto">
            {loading ? (
              <div className="text-center py-12 text-gray-500">Cargando información...</div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 text-red-700">{error}</div>
            ) : !project ? (
              <div className="text-center py-12 text-gray-500">No se encontró ningún proyecto asignado.</div>
            ) : (
              <>
                {/* Mostrar indicador cuando se está cargando un proyecto específico */}
                {loadingProject && (
                  <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                      <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                      <div className="mt-2 text-sm text-gray-600">Cargando proyecto...</div>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Progreso */}
                  <section className="col-span-1 bg-white rounded shadow p-6 flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-6 text-gray-700 self-start">Progreso del Proyecto</h2>
                    <div className="w-40 h-40 mb-4">
                      <ProgressCircle percentage={project.progress} size={160} strokeWidth={12} />
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-600">{project.progress}%</p>
                      <p className="text-gray-500">completado</p>
                    </div>
                    <div className="mt-6 w-full space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Inicio:</span>
                        <span className="font-medium">{new Date(project.start_date).toLocaleDateString('es-ES')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Fin estimado:</span>
                        <span className="font-medium">{new Date(project.end_date).toLocaleDateString('es-ES')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Estado:</span>
                        <span className="font-medium text-blue-600">{project.status}</span>
                      </div>
                    </div>
                  </section>

                  {/* Información del proyecto */}
                  <section className="col-span-2 bg-white rounded shadow p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">{project.name}</h2>
                    <p className="text-gray-600 mb-6">{project.description}</p>
                    
                    {responsable && (
                      <div className="mb-6">
                        <h3 className="text-md font-medium text-gray-700 mb-2">Responsable del proyecto:</h3>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            {responsable.name ? responsable.name.charAt(0).toUpperCase() : 'R'}
                          </div>
                          <div>
                            <p className="font-medium">{responsable.name}</p>
                            <p className="text-sm text-gray-500">{responsable.email}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Modelo 3D si está disponible */}
                    {model3d && (
                      <div className="mb-6">
                        <h3 className="text-md font-medium text-gray-700 mb-2">Vista previa 3D:</h3>
                        <iframe
                          title={model3d.name}
                          width="100%"
                          height="300"
                          src={model3d.url}
                          allowFullScreen
                          className="border-0 rounded"
                        ></iframe>
                      </div>
                    )}
                  </section>
                </div>

                {/* Tareas */}
                <section className="mt-6 bg-white rounded shadow p-6">
                  <h2 className="text-xl font-semibold mb-6 text-gray-700">Tareas del Proyecto</h2>
                  {tasks && tasks.length > 0 ? (
                    <div>
                      {/* Gantt Chart */}
                      <div className="mb-6 overflow-x-auto">
                        <div className="min-w-full" style={{ minWidth: '600px' }}>
                          <div className="flex mb-2">
                            <div className="w-1/3 font-medium text-gray-700">Tarea</div>
                            <div className="w-2/3 relative">
                              <div className="h-6 flex">
                                {[...Array(totalDays > 30 ? 30 : totalDays).keys()].map((i) => {
                                  const date = new Date(minDate);
                                  date.setDate(date.getDate() + i);
                                  return (
                                    <div key={i} className="flex-1 text-xs text-center text-gray-500 border-r border-gray-200">
                                      {i % 2 === 0 && (
                                        <span>{date.getDate()}/{date.getMonth() + 1}</span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {tasks.map((task) => (
                            <div key={task.id} className="flex py-2 border-t border-gray-100">
                              <div className="w-1/3 pr-4">
                                <div className="flex items-start">
                                  <div className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${
                                    task.status === 'completed' 
                                      ? 'bg-green-500' 
                                      : task.status === 'in_progress' 
                                        ? 'bg-yellow-500' 
                                        : 'bg-blue-500'
                                  }`}></div>
                                  <div className="ml-2">
                                    <p className="font-medium text-gray-700">{task.name}</p>
                                    <p className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${getStatusColor(task.status)}`}>
                                      {getStatusText(task.status)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="w-2/3 relative">
                                <div className="absolute inset-0 flex items-center">
                                  <div className="w-full h-1 bg-gray-100"></div>
                                </div>
                                <div 
                                  className={`absolute h-6 rounded ${
                                    task.status === 'completed' 
                                      ? 'bg-green-200' 
                                      : task.status === 'in_progress' 
                                        ? 'bg-yellow-200' 
                                        : 'bg-blue-200'
                                  }`}
                                  style={calculateTaskPosition(task)}
                                >
                                  <div className="h-full flex items-center justify-center px-2 overflow-hidden">
                                    <span className="text-xs whitespace-nowrap font-medium">{task.progress}%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Lista de tareas */}
                      <div>
                        <h3 className="font-medium text-gray-700 mb-4">Detalle de Tareas</h3>
                        <div className="space-y-4">
                          {tasks.map((task) => (
                            <div key={task.id} className="p-3 border border-gray-100 rounded-lg">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-gray-800">{task.name}</p>
                                  <div className="flex items-center mt-1 space-x-4">
                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                                      {getStatusText(task.status)}
                                    </span>
                                    <div className="flex items-center text-xs text-gray-500">
                                      <Calendar size={14} className="mr-1" />
                                      <span>{new Date(task.start_date).toLocaleDateString('es-ES')} - {new Date(task.end_date).toLocaleDateString('es-ES')}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center">
                                    <div className="w-12 h-12">
                                      <ProgressCircle percentage={task.progress} size={48} strokeWidth={6} />
                                    </div>
                                    <span className="ml-2 font-bold text-blue-600">{task.progress}%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No hay tareas disponibles para este proyecto.</p>
                  )}
                </section>

                {/* Actualizaciones */}
                <section className="mt-6 bg-white rounded shadow p-6">
                  <h2 className="text-xl font-semibold mb-6 text-gray-700">Actualizaciones Recientes</h2>
                  {updates && updates.length > 0 ? (
                    <div className="space-y-4">
                      {updates.map((update) => (
                        <div key={update.id} className="p-4 border-l-4 border-blue-400 bg-blue-50 rounded-r-lg">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start">
                              {update.completed ? (
                                <Check size={20} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                              ) : (
                                <AlertCircle size={20} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                              )}
                              <p className="text-gray-700">{update.content}</p>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 ml-4 flex-shrink-0">
                              <Clock size={14} className="mr-1" />
                              <span>{new Date(update.date).toLocaleDateString('es-ES')}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No hay actualizaciones recientes para este proyecto.</p>
                  )}
                </section>

                {/* Documentos */}
                <section className="mt-6 bg-white rounded shadow p-6">
                  <h2 className="text-xl font-semibold mb-6 text-gray-700">Documentos</h2>
                  {documents && documents.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                      {documents.map((doc) => (
                        <li key={doc.id} className="py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            {doc.type === 'pdf' ? (
                              <FileText className="text-red-500 mr-3" size={24} />
                            ) : doc.type === 'image' ? (
                              <FileType className="text-purple-500 mr-3" size={24} />
                            ) : doc.type === '3d' ? (
                              <File3d className="text-blue-500 mr-3" size={24} />
                            ) : (
                              <Clipboard className="text-gray-500 mr-3" size={24} />
                            )}
                            <div>
                              <p className="font-medium text-gray-800">{doc.name}</p>
                              <p className="text-xs text-gray-500">{doc.size}</p>
                            </div>
                          </div>
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50"
                          >
                            Ver
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No hay documentos disponibles para este proyecto.</p>
                  )}
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
