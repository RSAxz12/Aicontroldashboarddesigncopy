import { AlertTriangle, MessageSquare, Globe, MapPin, TrendingUp } from "lucide-react";

export function Dashboard() {
  // Mock data for demonstration
  const metrics = [
    { label: "إجمالي التقارير", value: "1,247", change: "+12%", icon: MessageSquare },
    { label: "التنبيهات الحرجة", value: "23", change: "+5", icon: AlertTriangle, critical: true },
    { label: "توزيع اللغات", value: "8", change: "نشط", icon: Globe },
  ];

  // Mock location data for the map
  const locations = [
    { id: 1, lat: 21.4225, lng: 39.8262, reports: 45, critical: false },
    { id: 2, lat: 21.4190, lng: 39.8175, reports: 89, critical: true },
    { id: 3, lat: 21.4265, lng: 39.8308, reports: 23, critical: false },
    { id: 4, lat: 21.4155, lng: 39.8220, reports: 156, critical: false },
    { id: 5, lat: 21.4280, lng: 39.8255, reports: 67, critical: true },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: '#D0C0A7',
                borderColor: 'rgba(42, 42, 42, 0.15)'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="p-3 rounded-lg"
                  style={{
                    backgroundColor: metric.critical ? '#A60303' : '#DECCA6'
                  }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: metric.critical ? '#EBE6D2' : '#2A2A2A' }}
                  />
                </div>
                <div className="text-right">
                  <p className="text-sm" style={{ color: '#5A5A5A' }}>{metric.label}</p>
                  <p className="text-3xl mt-1" style={{ color: '#2A2A2A', fontWeight: 600 }}>
                    {metric.value}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" style={{ color: '#5A5A5A' }} />
                <span className="text-sm" style={{ color: '#5A5A5A' }}>{metric.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Social Radar Map */}
      <div
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: '#D0C0A7',
          borderColor: 'rgba(42, 42, 42, 0.15)'
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl" style={{ color: '#2A2A2A', fontWeight: 600 }}>
            خريطة الرادار الاجتماعي
          </h2>
          <div className="flex items-center gap-4 text-sm" style={{ color: '#5A5A5A' }}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#DECCA6' }}></div>
              <span>عادي</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#A60303' }}></div>
              <span>حرج</span>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div
          className="relative rounded-lg overflow-hidden"
          style={{
            height: '500px',
            backgroundColor: '#EBE6D2'
          }}
        >
          {/* Map Grid Background */}
          <div className="absolute inset-0">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(42, 42, 42, 0.08)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Location Markers */}
          {locations.map((location) => {
            // Convert lat/lng to relative positions (simplified for demo)
            const x = ((location.lng - 39.81) / 0.03) * 100;
            const y = ((21.43 - location.lat) / 0.015) * 100;

            return (
              <div
                key={location.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${x}%`,
                  top: `${y}%`
                }}
              >
                {/* Pulse effect */}
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-75"
                  style={{
                    backgroundColor: location.critical ? '#A60303' : '#DECCA6',
                    width: '40px',
                    height: '40px',
                    top: '-12px',
                    left: '-12px'
                  }}
                ></div>

                {/* Marker */}
                <div
                  className="relative flex items-center justify-center rounded-full border-2"
                  style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: location.critical ? '#A60303' : '#DECCA6',
                    borderColor: '#EBE6D2'
                  }}
                >
                  <MapPin className="h-3 w-3" style={{ color: '#2A2A2A' }} />
                </div>

                {/* Tooltip */}
                <div
                  className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10"
                  style={{
                    backgroundColor: '#2A2A2A',
                    color: '#EBE6D2'
                  }}
                >
                  <p className="text-xs">{location.reports} تقرير</p>
                  {location.critical && (
                    <p className="text-xs" style={{ color: '#A60303' }}>حرج</p>
                  )}
                </div>
              </div>
            );
          })}

          {/* Map Label */}
          <div className="absolute bottom-4 right-4 px-4 py-2 rounded" style={{ backgroundColor: 'rgba(42, 42, 42, 0.8)' }}>
            <p className="text-sm" style={{ color: '#EBE6D2' }}>منطقة مكة المكرمة</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Stream */}
      <div
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: '#D0C0A7',
          borderColor: 'rgba(42, 42, 42, 0.15)'
        }}
      >
        <h2 className="text-xl mb-4" style={{ color: '#2A2A2A', fontWeight: 600 }}>
          النشاط الأخير
        </h2>

        <div className="space-y-3">
          {[
            { time: "منذ دقيقتين", text: "تنبيه حرج: ازدحام شديد مكتشف عند جسر الجمرات", critical: true },
            { time: "منذ 8 دقائق", text: "اكتمل تحليل اللغة للتقارير الواردة", critical: false },
            { time: "منذ 15 دقيقة", text: "تم تحديد مجموعة جديدة: طلبات المساعدة الطبية", critical: false },
            { time: "منذ 23 دقيقة", text: "تم حل التنبيه: الازدحام المروري في طريق الملك عبد العزيز", critical: false },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded"
              style={{ backgroundColor: '#EBE6D2' }}
            >
              <div
                className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: activity.critical ? '#A60303' : '#DECCA6' }}
              ></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ color: '#2A2A2A' }}>{activity.text}</p>
                <p className="text-xs mt-1" style={{ color: '#5A5A5A' }}>{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
