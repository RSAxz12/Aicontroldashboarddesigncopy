import { useState } from "react";
import { ChevronDown, ChevronUp, AlertCircle, MessageSquare, MapPin, Clock } from "lucide-react";

interface Report {
  id: string;
  subject: string;
  preview: string;
  timestamp: string;
  location: string;
  critical: boolean;
  groupCount?: number;
  relatedReports?: Report[];
}

export function Reports() {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // Mock data for reports with smart grouping
  const reports: Report[] = [
    {
      id: "r1",
      subject: "ازدحام شديد مكتشف عند جسر الجمرات",
      preview: "اكتشف الذكاء الاصطناعي تقارير متعددة تشير إلى ازدحام شديد...",
      timestamp: "منذ دقيقتين",
      location: "جسر الجمرات، القطاع أ",
      critical: true,
      groupCount: 99,
      relatedReports: [
        {
          id: "r1-1",
          subject: "حركة الحشود محدودة",
          preview: "الحجاج يبلغون عن صعوبة في التقدم للأمام...",
          timestamp: "منذ 3 دقائق",
          location: "جسر الجمرات، القطاع أ",
          critical: true
        },
        {
          id: "r1-2",
          subject: "طلب خدمات الطوارئ",
          preview: "الحاجة إلى المساعدة الطبية لكبار السن من الحجاج...",
          timestamp: "منذ 5 دقائق",
          location: "جسر الجمرات، القطاع أ",
          critical: true
        },
        {
          id: "r1-3",
          subject: "زيادة حوادث الإجهاد الحراري",
          preview: "تقارير متعددة عن حجاج يعانون من الإنهاك الحراري...",
          timestamp: "منذ 7 دقائق",
          location: "جسر الجمرات، القطاع ب",
          critical: true
        }
      ]
    },
    {
      id: "r2",
      subject: "طلبات مساعدة الحجاج الضائعين",
      preview: "مجموعة من التقارير حول حجاج منفصلين عن مجموعاتهم...",
      timestamp: "منذ 15 دقيقة",
      location: "منطقة خيام منى",
      critical: false,
      groupCount: 45,
      relatedReports: [
        {
          id: "r2-1",
          subject: "فقدان أحد أفراد العائلة",
          preview: "امرأة مسنة انفصلت عن مجموعة العائلة...",
          timestamp: "منذ 16 دقيقة",
          location: "منى، القطاع 12",
          critical: false
        },
        {
          id: "r2-2",
          subject: "أطفال ضائعون في الزحام",
          preview: "طفلان فقدا الاتصال مع والديهما...",
          timestamp: "منذ 18 دقيقة",
          location: "منى، القطاع 15",
          critical: false
        }
      ]
    },
    {
      id: "r3",
      subject: "تقارير نقص توزيع المياه",
      preview: "حدد الذكاء الاصطناعي نمطًا متكررًا لشكاوى ندرة المياه...",
      timestamp: "منذ 28 دقيقة",
      location: "صعيد عرفات",
      critical: false,
      groupCount: 67
    },
    {
      id: "r4",
      subject: "ردود فعل إيجابية على نظام اللافتات الجديد",
      preview: "الحجاج يعبرون عن امتنانهم للافتات الإرشادية متعددة اللغات...",
      timestamp: "منذ 35 دقيقة",
      location: "مواقع متعددة",
      critical: false,
      groupCount: 23
    },
    {
      id: "r5",
      subject: "تأخيرات النقل في المزدلفة",
      preview: "خدمات الحافلات تواجه تأخيرات بسبب حركة المرور...",
      timestamp: "منذ 42 دقيقة",
      location: "مركز نقل المزدلفة",
      critical: false,
      groupCount: 34
    }
  ];

  const toggleGroup = (id: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedGroups(newExpanded);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl mb-2" style={{ color: '#2A2A2A', fontWeight: 600 }}>
          صندوق التقارير
        </h1>
        <p className="text-sm" style={{ color: '#5A5A5A' }}>
          تقارير مجمعة بالذكاء الاصطناعي من المراقبة الاجتماعية والتقديمات المباشرة
        </p>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {reports.map((report) => {
          const isExpanded = expandedGroups.has(report.id);
          const hasGroup = report.groupCount && report.groupCount > 1;

          return (
            <div key={report.id}>
              {/* Main Report Entry */}
              <div
                className="p-5 rounded-lg border cursor-pointer transition-all hover:shadow-md"
                style={{
                  backgroundColor: '#DBD3C6',
                  borderColor: 'rgba(42, 42, 42, 0.15)'
                }}
                onClick={() => hasGroup && toggleGroup(report.id)}
              >
                <div className="flex items-start gap-4">
                  {/* Critical Indicator */}
                  <div className="flex-shrink-0 mt-1">
                    {report.critical ? (
                      <div className="p-2 rounded" style={{ backgroundColor: '#A60303' }}>
                        <AlertCircle className="h-4 w-4" style={{ color: '#EBE6D2' }} />
                      </div>
                    ) : (
                      <div className="p-2 rounded" style={{ backgroundColor: '#DECCA6' }}>
                        <MessageSquare className="h-4 w-4" style={{ color: '#2A2A2A' }} />
                      </div>
                    )}
                  </div>

                  {/* Report Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-medium" style={{ color: '#2A2A2A' }}>
                        {report.subject}
                      </h3>
                      {hasGroup && (
                        <div
                          className="flex items-center gap-2 px-3 py-1 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor: report.critical ? '#A60303' : '#B8B68F',
                            color: report.critical ? '#EBE6D2' : '#2A2A2A'
                          }}
                        >
                          <span className="text-sm font-medium">+{report.groupCount}</span>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-sm mb-3" style={{ color: '#5A5A5A' }}>
                      {report.preview}
                    </p>

                    <div className="flex items-center gap-4 text-xs" style={{ color: '#5A5A5A' }}>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{report.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{report.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion for Related Reports */}
              {hasGroup && isExpanded && report.relatedReports && (
                <div
                  className="mt-2 mr-12 p-4 rounded-lg border space-y-3"
                  style={{
                    backgroundColor: '#EBE6D2',
                    borderColor: 'rgba(42, 42, 42, 0.15)'
                  }}
                >
                  <p className="text-sm mb-3" style={{ color: '#5A5A5A', fontWeight: 500 }}>
                    التقارير المرتبطة في هذه المجموعة:
                  </p>

                  {report.relatedReports.map((related) => (
                    <div
                      key={related.id}
                      className="p-4 rounded border-l-4"
                      style={{
                        backgroundColor: '#D0C0A7',
                        borderLeftColor: related.critical ? '#A60303' : '#DECCA6'
                      }}
                    >
                      <h4 className="text-sm font-medium mb-2" style={{ color: '#2A2A2A' }}>
                        {related.subject}
                      </h4>
                      <p className="text-xs mb-2" style={{ color: '#5A5A5A' }}>
                        {related.preview}
                      </p>
                      <div className="flex items-center gap-4 text-xs" style={{ color: '#5A5A5A' }}>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{related.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{related.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    className="w-full py-2 px-4 rounded text-sm transition-colors"
                    style={{
                      backgroundColor: '#DECCA6',
                      color: '#2A2A2A'
                    }}
                  >
                    عرض جميع التقارير الـ {report.groupCount} في المجموعة
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
